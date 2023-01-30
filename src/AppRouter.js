import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

class AppRouter extends Component {
  render() {
    return (
      <>
        <Router forceRefresh={true}>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </>
    );
  }
}

export default AppRouter;
