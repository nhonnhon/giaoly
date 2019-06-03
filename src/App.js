import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { changeLanguage } from "./actions/index";
import routes from "./configs/routes";
import "./App.css";
import ImportData from "./screens/ImportData/ImportData";
import Dashboard from "./screens/Dashboard";
import Overview from "./screens/Overview";
import ListGroupQuestion from "./screens/ListGroupQuestion";

class App extends Component {
  // static propTypes = {
  //   changeLanguage: PropTypes.func,
  //   language: PropTypes.string
  // };

  // state = {
  //   lange: this.props.language
  // };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.language !== this.props.language) {
  //     this.setState({
  //       lange: this.props.language
  //     });
  //   }
  // }

  // onChangeLanguage = language => {
  //   this.props.changeLanguage(language);
  // };

  render() {
    return (
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path={routes.ImportData} component={ImportData} />
        <Route path={routes.Overview} component={Overview} />
        <Route path={routes.ListGroupQuestion} component={ListGroupQuestion} />
      </Router>
    );
  }
}

export default connect(
  null,
  null
)(App);
