import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { lang } from "../configs/lang";
import _ from "lodash";
import routes from "../configs/routes";
import {
  saveQuestionData,
  saveDataGroupAndPoints,
  saveTime,
  changeBG
} from "../actions/index";
import * as types from "../configs/constant";
import ShowQuestion from "./ShowQuestion";

import { Link } from "react-router-dom";
import btnBack from "../assets/images/btnBack.png";

class ListGroupQuestion extends Component {
  static propTypes = {
    location: PropTypes.object,
    saveQuestionData: PropTypes.func,
    saveDataGroupAndPoints: PropTypes.func,
    saveTime: PropTypes.func,
    listAllQuestion: PropTypes.any,
    currentMember: PropTypes.object,
    history: PropTypes.any,
    timeAll: PropTypes.any,
    dataGroupPoint: PropTypes.array,
    changeBG: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      countQuestion: 1,
      showListGroupQuestion: true,
      currentListQuestion: [],
      currentQuestion: {},
      currentCorrect: "",
      timeAll: 0,
      endTime: false,
      indexOfListQuestion: 0,
      groupQuestionName: ""
    };
  }

  componentDidMount() {
    const { currentMember } = this.props;
    const listLv = ["level3_1", "level3_2"];
    if (_.isEmpty(currentMember)) {
      this.props.history.push(routes.Overview);
    } else {
      const { level } = this.props.currentMember;
      const listAllQuestion = JSON.parse(
        localStorage.getItem(listLv.includes(level) ? "level3" : level)
      );
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
    this.props.changeBG(false);
  }

  handleTime = timeAll => {
    this.timeInterval = setInterval(() => {
      timeAll = timeAll - 1;
      if (timeAll < 1) {
        this.handleStopTime();
      }
      this.setState({ timeAll, endTime: timeAll < 10 && timeAll > 0 });
    }, 1000);
  };

  handleStopTime = () => {
    clearInterval(this.timeInterval);
  };

  renderGroupQuestion = () => {
    const {
      listAllQuestion,
      dataGroupPoint,
      currentMember: { currentGroup }
    } = this.props;
    const { listPass } = dataGroupPoint[currentGroup];
    return (
      <div className="list-group-question">
        <h2 className="text-center">{"chủ đề"}</h2>
        <div className="row">
          {_.map(
            listAllQuestion,
            ({ listQuestion, groupQuestionName }, index) => {
              const checkListPass = listPass.includes(groupQuestionName);
              return (
                <div className="col-6 mt-10 mb-10" key={index}>
                  <div
                    className={`btn-question text-uppercase bold text-center ${
                      checkListPass ? "finish" : ""
                    }`}
                    onClick={() =>
                      !checkListPass
                        ? this.showQuestion(
                            listQuestion,
                            groupQuestionName,
                            index
                          )
                        : {}
                    }
                  >
                    <h4>{lang[groupQuestionName]}</h4>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div style={{ marginTop: "120px", marginLeft: "20px" }}>
          <Link to={routes.Overview}>
            <img className="btn-action" src={btnBack} alt="image1" />
          </Link>
        </div>
      </div>
    );
  };

  showQuestion = (listQuestion, groupQuestionName, index) => {
    const listLength = listQuestion.length;
    const randomNumber = Math.floor(Math.random() * listLength);
    if (listLength === 0) {
      alert("Bộ câu hỏi đã hết");
      this.props.history.push(routes.Overview);
      return;
    }

    const {
      listAllQuestion,
      currentMember: { level },
      changeBG
    } = this.props;

    const currentQuestion = listQuestion[randomNumber];
    const { id } = currentQuestion;
    this.setState(
      {
        showListGroupQuestion: false,
        currentQuestion: currentQuestion,
        currentListQuestion: listQuestion,
        groupQuestionName: groupQuestionName,
        indexOfListQuestion: index
      },
      () => {
        changeBG(true);
      }
    );

    //delete question when show
    _.remove(listQuestion, data => data.id === id);
    listAllQuestion[index].listQuestion = listQuestion;
    localStorage.removeItem(level);
    localStorage.setItem(level, JSON.stringify(listAllQuestion));
    this.handleTime(this.state.timeAll);
  };

  backList = () => {
    this.setState(
      {
        showListGroupQuestion: true,
        timeAll: this.props.timeAll
      },
      () => {
        this.props.changeBG(false);
      }
    );
    this.handleStopTime();
  };

  onDone = () => {
    const { groupQuestionName } = this.state;
    const {
      dataGroupPoint,
      currentMember: { currentGroup, level }
    } = this.props;

    //change level already test
    dataGroupPoint[currentGroup][level] = true;
    const { listPass } = dataGroupPoint[currentGroup];
    if (groupQuestionName && listPass.indexOf(groupQuestionName) === -1) {
      listPass.push(groupQuestionName);
    }
    localStorage.setItem(types.dataGroupPoint, JSON.stringify(dataGroupPoint));
    this.props.saveDataGroupAndPoints(dataGroupPoint);
    this.props.history.push(routes.Overview);
  };

  nextQuestion = () => {
    const {
      currentListQuestion,
      countQuestion,
      indexOfListQuestion,
      groupQuestionName
    } = this.state;
    clearInterval(this.timeInterval);
    this.setState(
      {
        currentCorrect: "",
        countQuestion: countQuestion + 1
      },
      () => {
        this.showQuestion(
          currentListQuestion,
          groupQuestionName,
          indexOfListQuestion
        );
      }
    );
  };

  renderQuestion = () => {
    const { currentQuestion, currentCorrect } = this.state;
    return (
      <ShowQuestion
        currentQuestion={currentQuestion}
        currentCorrect={currentCorrect}
        nextQuestion={this.nextQuestion}
        handleStopTime={this.handleStopTime}
        backList={this.backList}
        onDone={this.onDone}
      />
    );
  };

  render() {
    console.log(this.props); // eslint-disable-line
    const { currentMember } = this.props;
    const { currentGroup, level } = currentMember;
    const {
      showListGroupQuestion,
      countQuestion,
      timeAll,
      endTime
    } = this.state;
    return (
      <div className="container">
        {showListGroupQuestion ? (
          <div>
            <h1 className="text-center">{`Chung sức cùng Giê Su`}</h1>
            <div className="mt-20">
              {!_.isEmpty(currentMember) ? this.renderGroupQuestion() : ""}
            </div>
          </div>
        ) : (
          <div>
            <h1 className={`text-center mb-40`}>{_.toUpper(`Câu hỏi`)}</h1>
            <div className="row alignCenter info-group mw-800 justifySpaceBetween">
              <div className="d-flex mb-10">
                <h3>{`Đội: ${currentGroup + 1}`}</h3>
                <h3>{`Khối: ${lang[level]}`}</h3>
                <h3>
                  {`Câu: `}
                  <span className="text-white point-circle">
                    {countQuestion}
                  </span>
                </h3>
              </div>
              <div className={`time ${endTime ? "end-time" : ""}`}>
                {timeAll}
              </div>
            </div>
            <div>{this.renderQuestion()}</div>
          </div>
        )}
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

export default connect(
  mapStateToProps,
  {
    saveQuestionData,
    saveDataGroupAndPoints,
    saveTime,
    changeBG
  }
)(ListGroupQuestion);
