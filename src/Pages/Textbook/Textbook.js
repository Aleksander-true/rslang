import React from 'react';
import Levels from './Levels';
import Words from './Words';
import api from './../../API';
import './textbook.css';

class Textbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentLevel: '1', currentPage: '1', words: [] };
  }

  componentDidMount() {
    this.getWords();
  }

  chooseLevel(level) {
    if (this.state.currentLevel === level) return;
    this.getWords(level);
  }

  async getWords(level = '1'){
    const response = await api.getChunkOfWords(level, '1');
     this.setState({ currentLevel: level, words: response.data })
  }

  render() {
    return (
      <div className="textbook">
        <h2 className="textbook__title">Электронный учебник</h2>
        <Levels clickLevel={(level) => this.chooseLevel(level)} />
        <Words level={this.state.currentLevel} words={this.state.words}/>
      </div>
    );
  }
}

export default Textbook;
