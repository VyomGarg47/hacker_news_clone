import React, { Component } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      select_values: ["story", "search", "all"],
    };
  }

  handleChange = (value, type) => {
    this.setState(
      ({ select_values }) => ({
        select_values: [
          ...select_values.slice(0, type),
          value,
          ...select_values.slice(type + 1),
        ],
      }),
      () => this.handleSubmit()
    );
  };

  handleSubmit = () => {
    const query = this.state.searchValue.replace(/\s/g, "+");
    const tag_value = this.state.select_values[0];
    const preference_value = this.state.select_values[1];
    const time_value = this.state.select_values[2];

    let url = "/" + preference_value + "?query=" + query;

    if (tag_value !== "all") {
      url = url + "&tags=" + tag_value;
    }
    if (time_value !== "all") {
      let created_before = new Date();
      if (time_value === "day") {
        created_before.setDate(created_before.getDate() - 1);
      } else if (time_value === "week") {
        created_before.setDate(created_before.getDate() - 7);
      } else if (time_value === "month") {
        created_before.setMonth(created_before.getMonth() - 1);
      } else if (time_value === "year") {
        created_before.setFullYear(created_before.getFullYear() - 1);
      }
      const timestamp = parseInt((created_before.getTime() / 1000).toFixed(0));
      url = url + "&numericFilters=created_at_i>" + timestamp;
    }
    url = url + "&typoTolerance=false";
    this.props.searchCallback(url, query);
  };

  render() {
    return (
      <div className="searchbar">
        <p className="logo" onClick={() => this.props.searchCallback(null, "")}>
          Hacker News
        </p>
        <TextField
          variant="outlined"
          placeholder="Search Hacker News"
          value={this.state.searchValue}
          fullWidth
          className="searchTextField"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="medium" />
              </InputAdornment>
            ),
            style: { background: "white", height: "100%" },
          }}
          onInput={(e) => {
            this.setState(
              {
                searchValue: e.target.value,
              },
              () => this.handleSubmit()
            );
          }}
        />
        <div className="items">
          <p className="text">Search </p>
          <Select
            className="select"
            color="warning"
            value={this.state.select_values[0]}
            onChange={(e) => this.handleChange(e.target.value, 0)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="story">Stories</MenuItem>
            <MenuItem value="comment">Comments</MenuItem>
          </Select>
        </div>
        <div className="items">
          <p className="text">by</p>
          <Select
            className="select"
            color="warning"
            value={this.state.select_values[1]}
            onChange={(e) => this.handleChange(e.target.value, 1)}
          >
            <MenuItem value="search">Popularity</MenuItem>
            <MenuItem value="search_by_date">Date</MenuItem>
          </Select>
        </div>
        <div className="items">
          <p className="text">for</p>
          <Select
            className="select"
            color="warning"
            value={this.state.select_values[2]}
            onChange={(e) => this.handleChange(e.target.value, 2)}
          >
            <MenuItem value="all">All time</MenuItem>
            <MenuItem value="day">Last 24h</MenuItem>
            <MenuItem value="week">Past Week</MenuItem>
            <MenuItem value="month">Past Month</MenuItem>
            <MenuItem value="year">Past Year</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default SearchBar;
