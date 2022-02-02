import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "Home"};
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

export default Home;