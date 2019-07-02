import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../configs/routes";

class ShowQuestion extends Component {
  static propTypes = {
    currentCorrect: PropTypes.string,
    currentQuestion: PropTypes.object,
    showCorrectQuestion: PropTypes.func,
    plusPointForMemberAndGroup: PropTypes.func,
    nextQuestion: PropTypes.func,
    handleStopTime: PropTypes.func
  };

  state = {
    correct: {
      a: "",
      b: "",
      c: "",
      d: ""
    }
  };

  showCorrectQuestion = choose => {
    const { correct } = this.props.currentQuestion;
    this.props.handleStopTime();
    if (correct === choose) {
      this.setState({
        correct: {
          ...this.state.correct,
          ...{ [choose]: "correct-answer" }
        }
      });
    } else {
      this.setState({
        correct: {
          ...this.state.correct,
          ...{ [choose]: "error-answer" }
        }
      });
    }
  };

  nextQuestion = () => {
    this.setState(
      {
        correct: {
          a: "",
          b: "",
          c: "",
          d: ""
        }
      },
      () => {
        this.props.nextQuestion();
      }
    );
  };

  render() {
    const { currentQuestion, plusPointForMemberAndGroup } = this.props;

    const { question, chooseA, chooseB, chooseC, chooseD } = currentQuestion;
    const { a, b, c, d } = this.state.correct;
    return (
      <div>
        <div className="mw-800">
          <h3 className="question-detail">{question}</h3>
          <div className="row">
            <div className="col-6">
              <div
                className={`choose-answer ${a}`}
                onClick={() => this.showCorrectQuestion("a")}
              >{`A. ${chooseA}`}</div>
            </div>
            <div className="col-6">
              <div
                className={`choose-answer ${b}`}
                onClick={() => this.showCorrectQuestion("b")}
              >{`B. ${chooseB}`}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div
                className={`choose-answer ${c}`}
                onClick={() => this.showCorrectQuestion("c")}
              >{`C. ${chooseC}`}</div>
            </div>
            <div className="col-6">
              <div
                className={`choose-answer ${d}`}
                onClick={() => this.showCorrectQuestion("d")}
              >{`D. ${chooseD}`}</div>
            </div>
          </div>
        </div>
        <div className="mt-40">
          <div style={{ maxWidth: "250px", margin: "0 auto" }}>
            <div className="row">
              <div>
                <input
                  type="button"
                  className="btn green"
                  value={"+"}
                  onClick={plusPointForMemberAndGroup}
                />
              </div>
              <div>
                <input
                  type="button"
                  className="btn blue"
                  value={">>"}
                  onClick={this.nextQuestion}
                />
              </div>
              <div>
                <Link className="btn blue" to={routes.Overview}>
                  {"<<<"}
                </Link>
              </div>
            </div>
            {/* {currentCorrect === "" ? (
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
                  value={"+"}
                  onClick={plusPointForMemberAndGroup}
                />
              </div>
              <div>
                <input
                  type="button"
                  className="btn blue"
                  value={">>"}
                  onClick={nextQuestion}
                />
              </div>
            </div>
          )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowQuestion;
