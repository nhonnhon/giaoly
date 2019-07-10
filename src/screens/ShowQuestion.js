import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../configs/routes";
import btnHome from "../assets/images/btnHome.png";
import btnDapAn from "../assets/images/btnDapAn.png";
import btnNext from "../assets/images/btnNext.png";

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
    listChoose: {
      a: "",
      b: "",
      c: "",
      d: ""
    }
  };

  showCorrectQuestion = choose => {
    const { correct } = this.props.currentQuestion;
    this.props.handleStopTime();
    if (choose === "show") {
      this.setState({
        listChoose: {
          ...this.state.listChoose,
          ...{ [correct]: "correct-answer" }
        }
      });
    } else {
      if (correct === choose) {
        this.setState({
          listChoose: {
            ...this.state.listChoose,
            ...{ [choose]: "correct-answer" }
          }
        });
      } else {
        this.setState({
          listChoose: {
            ...this.state.listChoose,
            ...{ [choose]: "error-answer" }
          }
        });
      }
    }
  };

  nextQuestion = () => {
    this.setState(
      {
        listChoose: {
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
    const { currentQuestion } = this.props;

    const { question, chooseA, chooseB, chooseC, chooseD } = currentQuestion;
    const { a, b, c, d } = this.state.listChoose;
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
        <div className="row justtifyContentCenter mt-40">
          <div>
            <Link to={routes.Overview}>
              <img className="btn-action" src={btnHome} alt="image1" />
            </Link>
          </div>
          <div>
            <div onClick={() => this.showCorrectQuestion("show")}>
              <img className="btn-action" src={btnDapAn} alt="image2" />
            </div>
          </div>
          <div>
            <div onClick={this.nextQuestion}>
              <img className="btn-action" src={btnNext} alt="image3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowQuestion;
