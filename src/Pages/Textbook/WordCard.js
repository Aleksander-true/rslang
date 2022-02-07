import React from 'react';
import { BASE_URL } from '../../constants';
import './textbook.css';

class WordCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Textbook' };
  }

  render() {
    const textMeaning = { __html: this.props.word.textMeaning };
    const textExample = { __html: this.props.word.textExample };
    const imgUrl = `${BASE_URL}/${this.props.word.image}`;
    const { word, wordTranslate, transcription, textExampleTranslate, textMeaningTranslate } = this.props.word;
    return (
      <>
        <img className="card__img" src={imgUrl} alt=""></img>
        <div className="card__description-wrapper">
          <h3>
            {word} - {transcription}
          </h3>
          <h4>
            <i>{wordTranslate}</i>
          </h4>
          <hr></hr>
          <h4>Значение</h4>
          <p dangerouslySetInnerHTML={textMeaning}></p>
          <p>{textMeaningTranslate}</p>
          <h4>Пример</h4>
          <p dangerouslySetInnerHTML={textExample}></p>
          <p>{textExampleTranslate}</p>
        </div>
      </>
    );
  }
}

export default WordCard;
