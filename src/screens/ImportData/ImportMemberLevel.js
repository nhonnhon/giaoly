import React, { Component } from "react";
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

export default ImportMemberLevel;
