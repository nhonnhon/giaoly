import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { lang } from "../configs/lang";
import _ from "lodash";
import routes from "../configs/routes";
import {
  saveQuestionData,
  saveDataGroupAndPoints,
  saveTime
} from "../actions/index";
import * as types from "../configs/constant";
import ShowQuestion from "./ShowQuestion";

class ListGroupQuestion extends Component {
  static propTypes = {
    location: PropTypes.object,
    saveQuestionData: PropTypes.func,
    saveDataGroupAndPoints: PropTypes.func,
    saveTime: PropTypes.func,
    listAllQuestion: PropTypes.any,
    currentMember: PropTypes.object,
    history: PropTypes.any,
    timeAll: PropTypes.any
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
      currentMemberPoint: this.props.currentMember.currentMemberPoint,
      timeAll: 0
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
      const timeAll = JSON.parse(localStorage.getItem(types.timeAll));
      this.setState({
        timeAll: timeAll
      });
      this.props.saveTime(timeAll);
      this.props.saveDataGroupAndPoints(groupAndPoint);
      this.props.saveQuestionData(listAllQuestion);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  componentDidUpdate() {
    const { listAllQuestion } = this.props;
    const { level } = this.props.currentMember;
    localStorage.removeItem(level);
    localStorage.setItem(level, JSON.stringify(listAllQuestion));
  }

  handleTime = timeAll => {
    this.timeInterval = setInterval(() => {
      timeAll = timeAll - 1;
      this.setState({ timeAll });
    }, 1000);
  };

  handleStopTime = () => {
    clearInterval(this.timeInterval);
  };

  renderGroupQuestion = () => {
    const { listAllQuestion } = this.props;
    return (
      <div className="list-group-question">
        <h2 className="text-center">{"chủ đề"}</h2>
        <div className="row">
          {_.map(listAllQuestion, (data, index) => (
            <div className="col-6 mt-20 mb-20" key={index}>
              <div
                className="btn-question text-uppercase bold text-center"
                onClick={() => {
                  this.showQuestion(data.listQuestion);
                }}
              >
                <h4>{lang[data.groupQuestionName]}</h4>
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
    this.handleTime(this.state.timeAll);
  };

  nextQuestion = () => {
    const { currentListQuestion, countQuestion } = this.state;
    clearInterval(this.timeInterval);
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
        nextQuestion={this.nextQuestion}
        handleStopTime={this.handleStopTime}
      />
    );
  };

  render() {
    console.log(this.props); // eslint-disable-line
    const {
      currentMember: { currentGroup, level }
    } = this.props;
    const { showListGroupQuestion, countQuestion, timeAll } = this.state;
    return (
      <div className="container">
        <div className={`${showListGroupQuestion ? "mt-40" : ""} mb-40 `}>
          {showListGroupQuestion ? (
            <div>
              <h1 className="text-center">{`Chung sức cùng Giê Su`}</h1>
              <div className="mt-20">{this.renderGroupQuestion()}</div>
            </div>
          ) : (
            <div>
              <h1 className={`text-center mb-40`}>{_.toUpper(`Câu hỏi`)}</h1>
              <div className="row alignCenter info-group mw-800 justifySpaceBetween">
                <div className="d-flex">
                  <h3>{`Đội: ${currentGroup + 1}`}</h3>
                  <h3>{`Khối: ${lang[level]}`}</h3>
                  <h3>
                    {`Câu: `}
                    <span className="text-white point-circle">
                      {countQuestion}
                    </span>
                  </h3>
                </div>
                <div className="time">{timeAll}</div>
              </div>
              <div>{this.showCurrentListQuestion()}</div>
            </div>
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
    currentMember: state.common.toJS().currentMember,
    timeAll: state.common.toJS().timeAll
  };
};

const mapDispatchToProps = {
  saveQuestionData,
  saveDataGroupAndPoints,
  saveTime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListGroupQuestion);
