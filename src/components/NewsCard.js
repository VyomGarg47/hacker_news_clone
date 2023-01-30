import ShowMoreText from "react-show-more-text";

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const NewsCard = ({ news, index }) => {
  const title = !news.title ? news.story_title : news.title;
  const url = !news.url ? news.story_url : news.url;
  const date = new Date(news.created_at_i * 1000).toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const author = news.author;
  const points = news.points + (news.points > 1 ? " points" : " point");
  const comment_cnt =
    news.num_comments === 0 ? "0 comment" : `${news.num_comments} comments`;
  const story_text = !news.story_text ? null : decodeHtml(news.story_text);
  const domain = !url ? null : new URL(url);
  return (
    <div className="newscard">
      <div className="index">
        <h3>{`${index + 1}.`}</h3>
      </div>
      <div className="text">
        <div className="toptext">
          <div className="title">
            <h3>{title}</h3>
          </div>
          {!url ? <div></div> : <a href={url}>{`(${domain.hostname})`}</a>}
        </div>
        <div className="middletext">
          <ShowMoreText>
            {!story_text ? (
              <div></div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: story_text }} />
            )}
          </ShowMoreText>
        </div>
        <p className="bottomtext">{`${points} by ${author} on ${date} • ${comment_cnt}`}</p>
      </div>
    </div>
  );
};

export default NewsCard;
