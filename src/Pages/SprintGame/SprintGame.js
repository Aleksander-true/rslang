import React from 'react';

class SprintGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "SprintGame"};
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

export default SprintGame;