import React from 'react';
import SelectDifficulty from './SelectDifficulty';
import { LEVELS_NAMES } from '../../constants';
import { PropsStartAudiocall } from './audiocall-types';

class StartAudiocall extends React.Component<PropsStartAudiocall> {
  constructor(props: PropsStartAudiocall) {
    super(props);
    this.state = {
      gameName: 'Audiocall',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="audiocall-start-page">
        <h2 className="audiocall-title">Аудиовызов</h2>
        <div className="audiocall-settings">
          <h3>
            Уровень cложности: <span className="difficulty-level">{LEVELS_NAMES[this.props.getDifficulty()]}</span>
          </h3>
          <div className="audiocall-select-start">
            <SelectDifficulty onChange={(value: string) => this.props.setDifficulty(Number(value))}></SelectDifficulty>
            <button type="button" className="btn btn-warning" onClick={() => this.props.startGame()}>
              Старт
            </button>
          </div>
        </div>
        <div className="description-audiocall">
          <ul>
            <li>
              Клавиши <span className="keys">1 - 5</span> - выбор ответа
            </li>
            <li>
              <span className="keys">Пробел</span> - повтор слова
            </li>
            <li>
              <span className="keys">Enter</span> - переход к следующему слову
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StartAudiocall;
