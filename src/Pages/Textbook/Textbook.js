import React from 'react';
import Levels from './Levels';
import Words from './Words';
import './textbook.css';

class Textbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Textbook' };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels />
        <Words />
      </div>
    );
  }
}

export default Textbook;
