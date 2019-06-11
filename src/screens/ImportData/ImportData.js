//Bộ số 1
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../../configs/routes";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import ImportNumber from "./ImportNumber";
import ImportMemberLevel from "./ImportMemberLevel";
import ImportQuestion from "./ImportQuestion";
import ImportPointQuestion from "./ImportPointQuestion";
import { lang } from "../../configs/lang";
import { saveDataGroupAndPoints } from "../../actions/index";
import { dataGroupPoint } from "../../configs/constant";

class ImportData extends Component {
  static propTypes = {
    saveDataGroupAndPoints: PropTypes.func
  };

  state = {
    amountGroup: 0,
    amountLevel: 0,
    listMember: {}
  };

  //change input of amount group or amount level
  onInputAmountChange = (props, val) => {
    this.setState({
      [props.id]: val
    });
  };

  //change input member of each level
  onInputMemberLevelChange = (props, val) => {
    const { listMember } = this.state;
    listMember[props.id] = val;
    this.setState({
      listMember: {
        ...listMember
      }
    });
  };

  //render input member of each level
  renderMemberOfEachLevel = () => {
    const { amountLevel } = this.state;
    let i = 0;
    let box = [];
    for (i; i < amountLevel; i++) {
      box.push(
        <div key={i}>
          <ImportMemberLevel
            id={`level${i + 1}`}
            title={`${lang.level} ${i + 1}`}
            onInputChange={this.onInputMemberLevelChange}
          />
        </div>
      );
    }
    return box;
  };

  //render input to import question of each level
  renderQuestionOfEachLevel = () => {
    const { amountLevel } = this.state;
    let i = 0;
    let box = [];
    for (i; i < amountLevel; i++) {
      box.push(
        <div key={i}>
          <ImportQuestion
            title={`${lang.levelQuestion} ${i + 1}`}
            id={`level${i + 1}`}
          />
        </div>
      );
    }
    return box;
  };

  //save all data
  saveAllData = () => {
    const { amountGroup, amountLevel, listMember } = this.state;
    if (
      amountGroup === 0 ||
      amountLevel === 0 ||
      _.size(listMember) !== parseInt(amountLevel)
    ) {
      alert(lang.alertProvideData);
    } else {
      const arrGroupAndPoint = [];
      for (let i = 0; i < amountGroup; i++) {
        const groupAndPoint = {};
        groupAndPoint.groupName = `group${i + 1}`;
        groupAndPoint.totalPoint = 0;
        groupAndPoint.members = [];
        for (let j = 0; j < _.size(listMember); j++) {
          const member = listMember[`level${j + 1}`];
          const eachMember = {};
          eachMember.levelName = `level${j + 1}`;
          if (member > 1) {
            for (let k = 0; k < member; k++) {
              eachMember[`member${j + 1}_${k + 1}`] = 0;
            }
          } else {
            eachMember[`member${j + 1}`] = 0;
          }
          groupAndPoint.members.push(eachMember);
        }
        arrGroupAndPoint.push(groupAndPoint);
      }
      localStorage.removeItem(dataGroupPoint);
      localStorage.setItem(dataGroupPoint, JSON.stringify(arrGroupAndPoint));
      this.props.saveDataGroupAndPoints(arrGroupAndPoint);
    }
  };

  render() {
    const { amountLevel } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mt-20">{lang.importData}</h1>
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
              id="amountLevel"
              title={lang.amountLevel}
              onInputChange={this.onInputAmountChange}
            />
          </div>
          <div className="col-3">
            <ImportPointQuestion title={lang.pointEachQuestion} />
          </div>
        </div>

        {amountLevel > 0 ? (
          <div>
            <h2 className="mt-40 text-blue">{lang.amountMember}</h2>
            <div className="row mt-10">{this.renderMemberOfEachLevel()}</div>
            <h2 className="mt-40 text-blue">{lang.importQuestion}</h2>
            <div className="row mt-10">{this.renderQuestionOfEachLevel()}</div>
          </div>
        ) : null}

        <div className="mt-40">
          <input
            type="button"
            className="btn green"
            value={lang.saveAll}
            onClick={this.saveAllData}
          />
        </div>

        <Link className="btn blue" to={routes.Overview}>
          {lang.overview}
        </Link>
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
  saveDataGroupAndPoints
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportData);
