import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { changeLanguage } from "./actions/index";
import routes from "./configs/routes";
import PropTypes from "prop-types";
import "./App.css";
import ImportData from "./screens/ImportData/ImportData";
import Overview from "./screens/Overview";
import ListGroupQuestion from "./screens/ListGroupQuestion";
import background from "../src/assets/images/background.jpg";
import backgroundQuestion from "../src/assets/images/backgroundQuestion.jpg";

class App extends Component {
  static propTypes = {
    bgQuestion: PropTypes.any
  };

  render() {
    const { bgQuestion } = this.props;
    return (
      <div>
        <Router>
          <Route path="/" exact component={ImportData} />
          <Route path={routes.Overview} component={Overview} />
          <Route
            path={routes.ListGroupQuestion}
            component={ListGroupQuestion}
          />
        </Router>
        <img
          className="backgroundImage"
          src={bgQuestion ? backgroundQuestion : background}
          alt="image1"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bgQuestion: state.common.toJS().bgQuestion
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
