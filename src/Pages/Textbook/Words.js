import React from 'react';
import WordCard from './WordCard';
import WordList from './WordList';

import './textbook.css';
import './words.css';

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentWordId: '' };
  }

  clickWord(id) {
    this.setState({ currentWordId: id });
  }

  render() {
    let wordCard, wordList;
    if (this.props.words.length !== 0) {
      wordCard = <WordCard words={this.props.words} currentWordId={this.state.currentWordId} />;
      wordList = <WordList words={this.props.words} clickWord={(id) => this.clickWord(id)} />;
    } else {
      wordCard = 'Loading...';
      wordList = 'Loading...';
    }
    return (
      <>
        <h2 className="textbook__title">Список слов</h2>
        <div className="words-wrapper">
          <div className="word__card">{wordCard}</div>
          <div className="word__list">{wordList}</div>
        </div>
      </>
    );
  }
}

export default Words;
