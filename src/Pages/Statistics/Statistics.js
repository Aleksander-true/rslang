import React from 'react';

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "Statistics"};
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

export default Statistics;