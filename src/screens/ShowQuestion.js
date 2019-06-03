import React, { Component } from "react";
import { lang } from "../configs/lang";
import PropTypes from "prop-types";

class ShowQuestion extends Component {
  static propTypes = {
    currentCorrect: PropTypes.string,
    currentQuestion: PropTypes.object,
    showCorrectQuestion: PropTypes.func,
    plusPointForMemberAndGroup: PropTypes.func,
    nextQuestion: PropTypes.func
  };

  render() {
    const {
      currentQuestion,
      currentCorrect,
      showCorrectQuestion,
      plusPointForMemberAndGroup,
      nextQuestion
    } = this.props;
    const {
      question,
      chooseA,
      chooseB,
      chooseC,
      chooseD,
      correct
    } = currentQuestion;
    return (
      <div className="mt-40">
        <div>
          <h3 className="choose-answer">{question}</h3>
          <div
            className={`choose-answer ${
              currentCorrect === "a" ? "text-blue bold" : ""
            }`}
          >{`A. ${chooseA}`}</div>
          <div
            className={`choose-answer ${
              currentCorrect === "b" ? "text-blue bold" : ""
            }`}
          >{`B. ${chooseB}`}</div>
          <div
            className={`choose-answer ${
              currentCorrect === "c" ? "text-blue bold" : ""
            }`}
          >{`C. ${chooseC}`}</div>
          <div
            className={`choose-answer ${
              currentCorrect === "d" ? "text-blue bold" : ""
            }`}
          >{`D. ${chooseD}`}</div>
          <div className="choose-answer">{`correct. ${correct}`}</div>
        </div>
        <div className="mt-40">
          {currentCorrect === "" ? (
            <div>
              <input
                type="button"
                className="btn green"
                value={lang.answer}
                onClick={showCorrectQuestion}
              />
            </div>
          ) : (
            <div className="row">
              <div>
                <input
                  type="button"
                  className="btn green"
                  value={lang.plusPoint}
                  onClick={plusPointForMemberAndGroup}
                />
              </div>
              <div>
                <input
                  type="button"
                  className="btn blue"
                  value={lang.nextQuestion}
                  onClick={nextQuestion}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShowQuestion;
