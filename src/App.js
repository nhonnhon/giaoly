import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { changeLanguage } from "./actions/index";
import routes from "./configs/routes";
import "./App.css";
import ImportData from "./screens/ImportData/ImportData";
import Overview from "./screens/Overview";
import ListGroupQuestion from "./screens/ListGroupQuestion";
import background from "../src/assets/images/background.jpg";

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
      <div>
        <Router>
          <Route path="/" exact component={ImportData} />
          <Route path={routes.Overview} component={Overview} />
          <Route
            path={routes.ListGroupQuestion}
            component={ListGroupQuestion}
          />
        </Router>
        <img className="backgroundImage" src={background} />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
