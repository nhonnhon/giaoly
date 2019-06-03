import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import routes from "../configs/routes";
import { lang } from "../configs/lang";
import { saveDataGroupAndPoints } from "../actions/index";
import _ from "lodash";
import * as types from "../configs/constant";
import routes from "../configs/routes";

class Overview extends Component {
  static propTypes = {
    saveDataGroupAndPoints: PropTypes.func,
    dataGroupPoint: PropTypes.array,
    history: PropTypes.any
  };

  componentDidMount() {
    const groupAndPoint = JSON.parse(
      localStorage.getItem(types.dataGroupPoint)
    );
    this.props.saveDataGroupAndPoints(groupAndPoint);
  }

  clickMember = (key, groupName, level, totalPoint, currentMemberPoint) => {
    this.props.history.push(routes.ListGroupQuestion, {
      id: key,
      groupName: groupName,
      level: `level${level + 1}`,
      totalPoint: totalPoint,
      currentMemberPoint: currentMemberPoint
    });
  };

  renderGroupAndPoints = () => {
    const { dataGroupPoint } = this.props;
    return _.map(dataGroupPoint, (data, index) => {
      return (
        <div key={index} className="col-3">
          <div className="group-card">
            <div className="group-header">
              <div className="row alignCenter">
                <div className="col-8">
                  <h3>{lang[data.groupName]}</h3>
                </div>
                <div className="col-4 text-center">
                  <div className="total-point bold text-red">
                    {data.totalPoint}
                  </div>
                </div>
              </div>
            </div>
            {this.renderGroup(data)}
          </div>
        </div>
      );
    });
  };

  renderGroup = ({ groupName, members, totalPoint }) =>
    _.map(members, (member, index) =>
      this.renderMember(member, groupName, index, totalPoint)
    );

  renderMember = (member, groupName, level, totalPoint) =>
    Object.keys(member).map(
      (key, index) =>
        key !== "levelName" && (
          <div className="member-card" key={index}>
            <div
              className="row alignCenter"
              onClick={() =>
                this.clickMember(key, groupName, level, totalPoint, member[key])
              }
            >
              <div className="col-8">
                <div>{lang[key]}</div>
              </div>
              <div className="col-4 text-center bold text-green">
                <div>{member[key]}</div>
              </div>
            </div>
          </div>
        )
    );

  render() {
    const { dataGroupPoint } = this.props;
    return (
      <div className="container">
        <h1>{lang.overview}</h1>
        <div className="mt-20">
          {dataGroupPoint && dataGroupPoint.length ? (
            <div className="row text-uppercase">
              {this.renderGroupAndPoints()}
            </div>
          ) : (
            <div>{"Data chưa được nhập"}</div>
          )}
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
  saveDataGroupAndPoints
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Overview));
