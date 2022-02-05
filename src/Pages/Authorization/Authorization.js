import React from 'react';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "Authorization"};
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

export default Authorization;