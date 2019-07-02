import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { lang } from "../configs/lang";
import { saveDataGroupAndPoints, setCurrentMember } from "../actions/index";
import _ from "lodash";
import * as types from "../configs/constant";
import routes from "../configs/routes";
import khaitam from "../assets/images/khaitam.png";
import ruocle from "../assets/images/ruocle.png";
import themsuc from "../assets/images/themsuc.png";
import baodong from "../assets/images/baodong.png";

class Overview extends Component {
  static propTypes = {
    saveDataGroupAndPoints: PropTypes.func,
    setCurrentMember: PropTypes.func,
    dataGroupPoint: PropTypes.array,
    history: PropTypes.any
  };

  state = {
    currentGroup: 0
  };

  componentDidMount() {
    const dataGroupPoint = JSON.parse(
      localStorage.getItem(types.dataGroupPoint)
    );
    this.props.saveDataGroupAndPoints(dataGroupPoint);
  }

  clickMember = type => {
    const { currentGroup } = this.state;
    this.props.setCurrentMember({
      level: type,
      currentGroup: currentGroup
    });
    this.props.history.push(routes.ListGroupQuestion);
  };

  changeGroup = index => {
    this.setState({
      currentGroup: index
    });
  };

  renderLevel = () => {
    const { dataGroupPoint } = this.props;
    const { currentGroup } = this.state;
    return (
      <div className="level-to-select">
        <div className="row">
          <div className="col-6">
            <div
              className={`button-level ${
                dataGroupPoint[currentGroup].level1 ? "finish" : ""
              }`}
              onClick={() =>
                !dataGroupPoint[currentGroup].level1
                  ? this.clickMember("level1")
                  : {}
              }
            >
              <img src={khaitam} alt="image1" />
            </div>
          </div>
          <div className="col-6">
            <div
              className={`button-level ${
                dataGroupPoint[currentGroup].level2 ? "finish" : ""
              }`}
              onClick={() =>
                !dataGroupPoint[currentGroup].level2
                  ? this.clickMember("level2")
                  : {}
              }
            >
              <img src={ruocle} alt="image2" />
            </div>
          </div>
          <div className="col-6">
            <div
              className={`button-level ${
                dataGroupPoint[currentGroup].level3 ? "finish" : ""
              }`}
              onClick={() =>
                !dataGroupPoint[currentGroup].level3
                  ? this.clickMember("level3")
                  : {}
              }
            >
              <img src={themsuc} alt="image3" />
            </div>
          </div>
          <div className="col-6">
            <div
              className={`button-level ${
                dataGroupPoint[currentGroup].level4 ? "finish" : ""
              }`}
              onClick={() =>
                !dataGroupPoint[currentGroup].level4
                  ? this.clickMember("level4")
                  : {}
              }
            >
              <img src={baodong} alt="image4" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderGroup = () => {
    const { dataGroupPoint } = this.props;
    const { currentGroup } = this.state;
    return (
      <div className="level-to-select d-flex justtifyContentCenter mt-20">
        {_.map(dataGroupPoint, (data, index) => (
          <div
            key={index}
            className={`group-circle ${index === currentGroup && "active"}`}
          >
            <div onClick={() => this.changeGroup(index)}>{index + 1}</div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { dataGroupPoint } = this.props;
    return (
      <div className="container">
        <div className="mt-20 mb-20">
          <h1 className="text-center">{`Chung sức cùng Giê Su`}</h1>
          <div className="mt-40">
            {dataGroupPoint && dataGroupPoint.length ? (
              <div>
                {this.renderLevel()}
                {this.renderGroup()}
              </div>
            ) : (
              <div>
                <div>{"Data chưa được nhập"}</div>
                <div>
                  <Link className="btn blue" to={"/"}>
                    {lang.importData}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataGroupPoint: state.common.toJS().dataGroupPoint
  };
};

const mapDispatchToProps = {
  saveDataGroupAndPoints,
  setCurrentMember
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Overview));
