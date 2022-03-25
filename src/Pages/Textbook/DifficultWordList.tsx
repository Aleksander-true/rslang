import React from 'react';

function DifficultWordList(props: DifficultWordListProps) {
  if (props.userWords[0].paginatedResults.length === 0) return <>Loading ...</>;
  const words = props.userWords[0].paginatedResults
    .filter((item) => item.userWord?.difficulty === 'hard')
    .map((item) => (
      <button
        className={'list__button level' + item.group + (props.currentWord === item._id ? ' active' : '')}
        key={item._id}
        onClick={() => {
          props.clickWord(item._id);
        }}
      >
        <h3 className="list__word">{item.word}</h3>
        <h4>
          <i>{item.wordTranslate}</i>
        </h4>
        <i className="bi bi-exclamation-circle exclamation_bottom-right"></i>
      </button>
    ));
  return <div className="word__list">{words}</div>;
}

export default DifficultWordList;
