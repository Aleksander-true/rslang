import React from 'react';
import './textbook.css';
import './words.css';

class WordList extends React.Component {

  render() {
    const words = this.props.words.map((item) =>
      <button className='list__button' key={item.id} onClick={()=>this.props.clickWord(item.id)}>
        <h3 className='list__word'>{item.word}</h3>
        <h4><i>{item.wordTranslate}</i></h4>
      </button>
    )
    return (
      <>
      {words}
      </>
    )
  }
}

export default WordList;
