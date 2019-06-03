import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { changeLanguage } from "./actions/index";
import routes from "../configs/routes";
import { lang } from "../configs/lang";
// import _ from "lodash";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>{lang.overview}</h1>
        <div>
          <Link className="btn blue" to={routes.ImportData}>
            {lang.importData}
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Dashboard);
