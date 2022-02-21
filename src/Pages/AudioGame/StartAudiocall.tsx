import React from 'react';
import { PropsStartAudiocall, StartAudiocallState } from './audiocall-types';
import Level from './Level';
import whatWords from '../../Components/whatWords';

class StartAudiocall extends React.Component<PropsStartAudiocall> {
  state: StartAudiocallState;

  constructor(props: PropsStartAudiocall) {
    super(props);
    this.state = {
      isStartedFromManual: this.props.getManualState(),
    };
  }

  componentDidMount() {
    this.updateState();
    if (this.state.isStartedFromManual) {
      this.props.startGame();
    }
  }

  componentWillUnmount() {
    this.updateState();
  }

  updateState() {
    this.setState({
      isStartedFromManual: Boolean(whatWords.level) && Boolean(whatWords.page),
    });
  }

  returnLevelButton(color: string, label: string, value: number) {
    return <Level color={color} label={label} value={value} onClick={(value) => this.props.startGame(value)} />;
  }

  returnSettings() {
    return (
      <div className="audiocall-settings">
        <h3>Уровень cложности:</h3>
        <div className="sprint__levels-options">
          {this.returnLevelButton('#AAF3E2', 'A1', 0)}
          {this.returnLevelButton('#68D4BB', 'A1+', 1)}
          {this.returnLevelButton('#FCE74E', 'A2', 2)}
          {this.returnLevelButton('#FFBA4A', 'B1', 3)}
          {this.returnLevelButton('#FFB197', 'B2', 4)}
          {this.returnLevelButton('#FC7E53', 'C1', 5)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="audiocall-start-page">
        <h2 className="audiocall-title">Аудиовызов</h2>
        {this.returnSettings()}
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
            <li>
              <span className="keys">Escape</span> - выход из игры
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StartAudiocall;
