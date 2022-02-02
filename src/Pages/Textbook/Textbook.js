import React from 'react';

class Textbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "Textbook"};
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

export default Textbook;