import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { lang } from "../configs/lang";
import _ from "lodash";
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
    dataGroupPoint: PropTypes.array,
    currentMember: PropTypes.object,
    history: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      countQuestion: 0,
      showListGroupQuestion: true,
      currentListQuestion: [],
      currentQuestion: {},
      currentCorrect: "",
      currentGroupPoint: this.props.currentMember.totalPoint,
      currentMemberPoint: this.props.currentMember.currentMemberPoint
    };
  }

  componentDidMount() {
    const { currentMember } = this.props;
    if (_.isEmpty(currentMember)) {
      this.props.history.push(routes.Overview);
    } else {
      const { level } = this.props.currentMember;
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
  }

  componentDidUpdate() {
    const { listAllQuestion } = this.props;
    const { level } = this.props.currentMember;
    localStorage.removeItem(level);
    localStorage.setItem(level, JSON.stringify(listAllQuestion));
  }

  renderGroupQuestion = () => {
    const { listAllQuestion } = this.props;
    return (
      <div className="list-group-question">
        <div className="row">
          {_.map(listAllQuestion, (data, index) => (
            <div className="col-3 mt-40 mb-40" key={index}>
              <div
                className="btn-question text-uppercase bold text-center"
                onClick={() => {
                  this.showQuestion(data.listQuestion);
                }}
              >
                <h4>{data.groupQuestionName}</h4>
              </div>
            </div>
          ))}
        </div>
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

    const { groupName, level, id } = this.props.currentMember;
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
    const { currentListQuestion, countQuestion } = this.state;
    this.setState(
      {
        currentCorrect: "",
        countQuestion: countQuestion + 1
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
    const { groupName, /*id,*/ level } = this.props.currentMember;
    const {
      showListGroupQuestion,
      currentGroupPoint,
      currentMemberPoint,
      countQuestion
    } = this.state;
    return (
      <div className="container">
        <div className="mt-40 mb-40">
          <h1 className={`text-center ${level} mb-40`}>
            {_.toUpper(`Bộ câu hỏi ${lang[level]}`)}
          </h1>
          <div className="row alignCenter">
            <div className="col-4">
              <h3 className="mt-40 mb-40">
                {`Số câu hỏi đã thi: `}
                <span className="text-sky point-circle">{countQuestion}</span>
              </h3>
            </div>
            <div className="col-4">
              <h3 className="mt-40 mb-40">
                {`Điểm ${lang[groupName]}: `}
                <span className="text-red point-circle">
                  {currentGroupPoint}
                </span>
              </h3>
            </div>
            <div className="col-4">
              <h3 className="mt-40 mb-40">
                {`Điểm thành viên: `}
                <span className="text-green point-circle">
                  {currentMemberPoint}
                </span>
              </h3>
            </div>
          </div>

          {showListGroupQuestion ? (
            <div className="mt-20">{this.renderGroupQuestion()}</div>
          ) : (
            <div>{this.showCurrentListQuestion()}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listAllQuestion: state.common.toJS().listAllQuestion,
    dataGroupPoint: state.common.toJS().dataGroupPoint,
    pointEachQuestion: state.common.toJS().pointEachQuestion,
    currentMember: state.common.toJS().currentMember
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
