import React, { Component } from "react";
import { lang } from "../../configs/lang";
import PropTypes from "prop-types";

class ImportMemberLevel extends Component {
  static propTypes = {
    onInputChange: PropTypes.func,
    value: PropTypes.number,
    title: PropTypes.string
  };

  handleChange = event => {
    const { onInputChange } = this.props;
    onInputChange && onInputChange(this.props, event.target.value);
  };

  render() {
    const { title, value } = this.props;
    return (
      <div className="box-block-border">
        <h4 className="mb-10">{title}</h4>
        <div>
          <input type="number" onChange={this.handleChange} />
        </div>
        <h4 className="mt-10">
          {lang.current}:{" "}
          <span className="text green">{value ? value : 0}</span>
        </h4>
      </div>
    );
  }
}

export default ImportMemberLevel;
