import React from 'react';
import { PropsBlockedButton } from './audiocall-types';

class BlockedButton extends React.Component<PropsBlockedButton> {
  render() {
    return (
      <button
        disabled={true}
        type="button"
        className={this.props.isCorrect ? this.props.possibleClasses[0] : this.props.possibleClasses[1]}
      >
        {this.props.value}
      </button>
    );
  }
}

export default BlockedButton;
