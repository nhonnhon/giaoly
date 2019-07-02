//Bộ số 1
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../../configs/routes";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImportNumber from "./ImportNumber";
import ImportQuestion from "./ImportQuestion";
import { lang } from "../../configs/lang";
import { saveDataGroupAndPoints, saveTime } from "../../actions/index";
import { dataGroupPoint, timeAll } from "../../configs/constant";
import _ from "lodash";

class ImportData extends Component {
  static propTypes = {
    saveDataGroupAndPoints: PropTypes.func,
    saveTime: PropTypes.func
  };

  state = {
    amountGroup: 0,
    time: 0
  };

  //change input of amount group or amount level
  onInputAmountChange = (props, val) => {
    this.setState({
      [props.id]: val
    });
  };

  //save all data
  saveAllData = () => {
    const { amountGroup, time } = this.state;
    if (amountGroup === 0) {
      alert(lang.alertProvideData);
    } else {
      const arrGroupAndPoint = [];
      for (let i = 0; i < amountGroup; i++) {
        const groupAndPoint = {};
        groupAndPoint.groupName = `group${i + 1}`;
        groupAndPoint.khaitam = false;
        groupAndPoint.ruocle = false;
        groupAndPoint.themsuc = false;
        groupAndPoint.baodong = false;
        arrGroupAndPoint.push(groupAndPoint);
      }
      localStorage.removeItem(dataGroupPoint);
      localStorage.removeItem(timeAll);
      localStorage.setItem(dataGroupPoint, JSON.stringify(arrGroupAndPoint));
      localStorage.setItem(timeAll, time);
      this.props.saveDataGroupAndPoints(arrGroupAndPoint);
      this.props.saveTime(time);
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">{lang.importData}</h1>
        <div className="row mt-40">
          <div className="col-3">
            <ImportNumber
              id="amountGroup"
              title={lang.amountGroup}
              onInputChange={this.onInputAmountChange}
            />
          </div>
          <div className="col-3">
            <ImportNumber
              id="time"
              title={"Thời gian thi (giây)"}
              onInputChange={this.onInputAmountChange}
            />
          </div>
        </div>
        <h2 className="mt-40 text-blue">{lang.importQuestion}</h2>
        <div className="row mt-10">
          {_.map([1, 2, 3, 4], data => (
            <div key={data} className="col-3 text-center">
              <ImportQuestion
                title={`${lang[`level${data}`]}`}
                id={`level${data}`}
              />
            </div>
          ))}
        </div>
        <div className="row mt-40">
          <div>
            <input
              type="button"
              className="btn green"
              value={lang.saveAll}
              onClick={this.saveAllData}
            />
          </div>
          <div>
            <Link className="btn blue" to={routes.Overview}>
              {`Tổng quan`}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
    amount: ""
  };
};

const mapDispatchToProps = {
  saveDataGroupAndPoints,
  saveTime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportData);
