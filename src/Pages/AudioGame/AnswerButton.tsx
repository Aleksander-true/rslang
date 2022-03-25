import React from 'react';
import { PropsAnswerButton } from './audiocall-types';
import { AnswerButtonState } from './audiocall-types';

class AnswerButton extends React.Component<PropsAnswerButton> {
  state: AnswerButtonState;

  constructor(props: PropsAnswerButton) {
    super(props);
    this.state = {
      isCorrect: this.props.isCorrect,
      value: this.props.value,
      timer: setTimeout(() => {}, 0),
    };
  }

  componentDidMount() {
    this.setState({
      timer: setTimeout(() => {
        this.updateButton();
      }, 0),
    });
  }

  componentWillUnmount() {
    this.setState({
      timer: clearTimeout(this.state.timer),
    });
  }

  updateButton() {
    this.setState({
      isCorrect: this.props.isCorrect,
      value: this.props.value,
    });
  }

  returnStatusAndValue() {
    const isCorrect = this.state.isCorrect;
    const value = this.state.value;
    this.props.onClick(isCorrect, value);
  }

  returnIDName() {
    return `answer-${this.props.id}`;
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-warning"
        id={this.returnIDName()}
        onClick={() => this.returnStatusAndValue()}
      >
        {this.state.value}
      </button>
    );
  }
}

export default AnswerButton;
