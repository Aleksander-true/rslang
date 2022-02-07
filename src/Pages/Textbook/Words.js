import React from 'react';
import WordCard from './WordCard';
import WordList from './WordList';
import api from './../../API';
import './textbook.css';
import './words.css';

class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: false };
    this.words = [];
  }

  async componentDidMount() {
    const response = await api.getChunkOfWords(1, 1);
    this.words = response.data;
    this.setState({ words: true });
  }

  render() {
    let wordCard;
    if (this.state.words) {
      wordCard = <WordCard word={this.words[0]} />;
    } else {
      wordCard = 'Loading...';
    }

    return (
      <>
        <h2 className="textbook__title">Список слов</h2>
        <div className="words-wrapper">
          <div className="word__card">{wordCard}</div>
          <div className="word__list">
            <WordList />
          </div>
        </div>
      </>
    );
  }
}

export default Words;
