import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../configs/routes";
import btnHome from "../assets/images/btnHome.png";
import btnDapAn from "../assets/images/btnDapAn.png";
import btnNext from "../assets/images/btnNext.png";
import btnBack from "../assets/images/btnBack.png";
import btnDone from "../assets/images/btnDone.png";

class ShowQuestion extends Component {
  static propTypes = {
    currentQuestion: PropTypes.object,
    showCorrectQuestion: PropTypes.func,
    nextQuestion: PropTypes.func,
    handleStopTime: PropTypes.func,
    backList: PropTypes.func,
    onDone: PropTypes.func
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
          <Link to={routes.Overview}>
            <img className="btn-action" src={btnHome} alt="image1" />
          </Link>
          <div onClick={() => this.showCorrectQuestion("show")}>
            <img className="btn-action" src={btnDapAn} alt="image2" />
          </div>
          <div onClick={this.nextQuestion}>
            <img className="btn-action" src={btnNext} alt="image3" />
          </div>
          <div onClick={this.props.backList}>
            <img className="btn-action" src={btnBack} alt="image4" />
          </div>
          <div onClick={this.props.onDone}>
            <img className="btn-action" src={btnDone} alt="image5" />
          </div>
        </div>
      </div>
    );
  }
}

export default ShowQuestion;
