import React from 'react';
import { PropsWordInfo } from './audiocall-types';

class WordInfo extends React.Component<PropsWordInfo> {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="word-info">
        <button type="button" className="btn btn-primary play-word" onClick={() => this.props.playWord()}></button>
      </div>
    );
  }
}

export default WordInfo;
