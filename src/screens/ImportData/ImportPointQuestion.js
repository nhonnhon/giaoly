import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { savePointQuestion } from "../../actions/index";
import * as types from "../../configs/constant";

class ImportPointQuestion extends Component {
  static propTypes = {
    title: PropTypes.string,
    savePointQuestion: PropTypes.func
  };

  handleChange = event => {
    localStorage.removeItem(types.pointEachQuestion);
    localStorage.setItem(types.pointEachQuestion, event.target.value);
    this.props.savePointQuestion(event.target.value);
  };

  render() {
    const { title } = this.props;
    return (
      <div className="box-block-border">
        <h4 className="mb-10">{title}</h4>
        <div>
          <input type="number" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  savePointQuestion
};

export default connect(
  null,
  mapDispatchToProps
)(ImportPointQuestion);
