import React from 'react';

class AudioGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "AudioGame"};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
        <h1>{this.state.text}</h1>
    );
  }
}

export default AudioGame;