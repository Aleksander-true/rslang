import React from 'react';
import { PropsLevel } from './audiocall-types';

class Level extends React.Component<PropsLevel> {
  constructor(props: PropsLevel) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sprint__levels__level" onClick={() => this.props.onClick(this.props.value)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className="bi bi-x-lg" viewBox="0 0 147 129">
          <g clip-path="url(#clip0_39_263)">
            <path
              d="M104.369 108.88C141.201 82.8661 157.213 41.9782 140.135 17.554C123.056 -6.87021 79.353 -5.58174 42.5216 20.4319C5.69009 46.4455 -10.3227 87.3334 6.75606 111.758C23.8348 136.182 67.5377 134.893 104.369 108.88Z"
              fill={this.props.color}
            ></path>
          </g>
        </svg>{' '}
        <p className="sprint__levels__name">{this.props.label}</p>
      </div>
    );
  }
}

export default Level;
