import React, { Component } from "react";
import { BASE_API_URL } from "./utils/constants";
import Pagination from "@mui/material/Pagination";
import NewsCard from "./components/NewsCard";
import SearchBar from "./components/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageCount: 50,
      currentPage: 0,
      isLoading: true,
      searchResults: false,
      search: "",
    };
  }

  componentDidMount() {
    this.getStories();
  }

  handlePageChange = (e, page) => {
    this.setState(
      {
        isLoading: true,
        currentPage: page - 1,
      },
      () => {
        this.getStories();
      }
    );
    e.preventDefault();
  };

  handleSearchCallback = (searchDataUrl, query) => {
    this.setState(
      {
        pageCount: 50,
        currentPage: 0,
        isLoading: true,
        searchResults: query === "" ? false : true,
        search: query === "" ? "" : searchDataUrl,
      },
      () => {
        this.getStories();
      }
    );
  };

  getStories = async () => {
    try {
      console.log(this.state.currentPage);
      const url =
        BASE_API_URL +
        (!this.state.searchResults
          ? `/search_by_date?tags=story`
          : this.state.search) +
        `&page=${this.state.currentPage}`;
      console.log(url);
      const res = await fetch(url);
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const data = await res.json();
      this.setState({
        items: data.hits,
        pageCount: data.nbPages,
        isLoading: false,
      });
    } catch (error) {
      console.log(`Error while getting list of stories! ${error}`);
    }
  };

  render() {
    return (
      <div className="homepage">
        <SearchBar searchCallback={this.handleSearchCallback} />
        {this.state.isLoading ? (
          <div className="loading">
            <p className="text">Loading...</p>
            <CircularProgress size={20} />
          </div>
        ) : (
          <div>
            {this.state.items.map((news, news_id) => (
              <NewsCard
                news={news}
                index={
                  this.state.currentPage * this.state.items.length + news_id
                }
                key={news_id}
              />
            ))}
            <div className="pagenumbers">
              <Pagination
                page={this.state.currentPage + 1}
                count={this.state.pageCount}
                onChange={this.handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
