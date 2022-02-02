import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "About"};
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

export default About;