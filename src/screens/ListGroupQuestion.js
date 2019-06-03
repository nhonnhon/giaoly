import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { lang } from "../configs/lang";
import _ from "lodash";
import { Link } from "react-router-dom";
import routes from "../configs/routes";
import {
  saveQuestionData,
  saveDataGroupAndPoints,
  savePointQuestion
} from "../actions/index";
import * as types from "../configs/constant";
import ShowQuestion from "./ShowQuestion";

class ListGroupQuestion extends Component {
  static propTypes = {
    location: PropTypes.object,
    saveQuestionData: PropTypes.func,
    saveDataGroupAndPoints: PropTypes.func,
    savePointQuestion: PropTypes.func,
    listAllQuestion: PropTypes.any,
    pointEachQuestion: PropTypes.number,
    dataGroupPoint: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      showListGroupQuestion: true,
      currentListQuestion: [],
      currentQuestion: {},
      currentCorrect: "",
      currentGroupPoint: this.props.location.state.totalPoint,
      currentMemberPoint: this.props.location.state.currentMemberPoint
    };
  }

  componentDidMount() {
    const { level } = this.props.location.state;
    const listAllQuestion = JSON.parse(localStorage.getItem(level));
    const groupAndPoint = JSON.parse(
      localStorage.getItem(types.dataGroupPoint)
    );
    const pointEachQuestion = JSON.parse(
      localStorage.getItem(types.pointEachQuestion)
    );
    this.props.savePointQuestion(pointEachQuestion);
    this.props.saveDataGroupAndPoints(groupAndPoint);
    this.props.saveQuestionData(listAllQuestion);
  }

  componentDidUpdate() {
    const { listAllQuestion } = this.props;
    const { level } = this.props.location.state;
    localStorage.removeItem(level);
    localStorage.setItem(level, JSON.stringify(listAllQuestion));
  }

  renderGroupQuestion = () => {
    const { listAllQuestion } = this.props;
    return (
      <div className="row">
        {_.map(listAllQuestion, (data, index) => (
          <div className="col-2 mt-20 mb-20" key={index}>
            <div
              className="btn-question text-uppercase bold text-center"
              onClick={() => {
                this.showQuestion(data.listQuestion);
              }}
            >
              {data.groupQuestionName}
            </div>
          </div>
        ))}
      </div>
    );
  };

  showQuestion = listQuestion => {
    const listLength = listQuestion.length;
    const randomNumber = Math.floor(Math.random() * listLength);
    if (listLength === 0) {
      alert("finish");
      return;
    }
    this.setState({
      showListGroupQuestion: false,
      currentQuestion: listQuestion[randomNumber],
      currentListQuestion: listQuestion
    });
  };

  plusPointForMemberAndGroup = () => {
    const { currentGroupPoint, currentMemberPoint } = this.state;
    const { pointEachQuestion } = this.props;
    const newPointGroup = currentGroupPoint + parseInt(pointEachQuestion);
    const newPointMember = currentMemberPoint + parseInt(pointEachQuestion);
    this.setState({
      currentGroupPoint: newPointGroup,
      currentMemberPoint: newPointMember
    });

    const { groupName, level, id } = this.props.location.state;
    const { dataGroupPoint } = this.props;
    //get index of group change point
    const indexGroup = _.findIndex(
      dataGroupPoint,
      data => data.groupName === groupName
    );
    //get object of group change point
    const findGroup = _.find(
      dataGroupPoint,
      data => data.groupName === groupName
    );
    //get list member change point
    const findMember = _.find(
      findGroup.members,
      data => data.levelName === level
    );
    //get index of member change point
    const indexMember = _.findIndex(
      findGroup.members,
      data => data.levelName === level
    );
    //change new point of member
    findMember[id] = newPointMember;
    //replace member change point
    findGroup.members.splice(indexMember, 1, findMember);
    // change new point of group
    findGroup.totalPoint = newPointGroup;
    // repace group change point
    dataGroupPoint.splice(indexGroup, 1, findGroup);
    localStorage.setItem(types.dataGroupPoint, JSON.stringify(dataGroupPoint));
  };

  nextQuestion = () => {
    const { currentListQuestion } = this.state;
    this.setState(
      {
        currentCorrect: ""
      },
      () => {
        this.showQuestion(currentListQuestion);
      }
    );
  };

  showCorrectQuestion = (id, correct) => {
    const { currentListQuestion } = this.state;
    _.remove(currentListQuestion, data => data.id === id);
    this.setState({
      currentListQuestion: currentListQuestion,
      currentCorrect: correct
    });
  };

  showCurrentListQuestion = () => {
    const { currentQuestion, currentCorrect } = this.state;
    const { id, correct } = currentQuestion;
    return (
      <ShowQuestion
        currentQuestion={currentQuestion}
        currentCorrect={currentCorrect}
        showCorrectQuestion={() => this.showCorrectQuestion(id, correct)}
        plusPointForMemberAndGroup={this.plusPointForMemberAndGroup}
        nextQuestion={this.nextQuestion}
      />
    );
  };

  render() {
    console.log(this.props); // eslint-disable-line
    const { groupName, id, level } = this.props.location.state;
    const {
      showListGroupQuestion,
      currentGroupPoint,
      currentMemberPoint
    } = this.state;
    return (
      <div className="container">
        <h1>{lang.selectGroupQuestion}</h1>
        <h2 className="mt-20">{`${lang.levelQuestion} ${lang[level]}`}</h2>
        <div className="row">
          <div className="col-6">
            <h3 className="mt-20">
              {`${lang[id]}: `}
              <span className="text-green">{currentMemberPoint}</span>
            </h3>
          </div>
          <div className="col-6">
            <h3 className="mt-20">
              {`${lang[groupName]}: `}
              <span className="text-red">{currentGroupPoint}</span>
            </h3>
          </div>
        </div>

        {showListGroupQuestion ? (
          <div className="mt-20">{this.renderGroupQuestion()}</div>
        ) : (
          <div>{this.showCurrentListQuestion()}</div>
        )}
        <div className="mt-20">
          <Link className="btn blue" to={routes.Overview}>
            {lang.backOverview}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listAllQuestion: state.common.toJS().listAllQuestion,
    dataGroupPoint: state.common.toJS().dataGroupPoint,
    pointEachQuestion: state.common.toJS().pointEachQuestion
  };
};

const mapDispatchToProps = {
  saveQuestionData,
  saveDataGroupAndPoints,
  savePointQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListGroupQuestion);
