import React from 'react';
import './textbook.css';

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Textbook' };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <>loading ...</>;
  }
}

export default WordList;
