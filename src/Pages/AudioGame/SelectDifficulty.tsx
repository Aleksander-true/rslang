import React from 'react';
import { PropsSelectDifficulty } from './audiocall-types';
class SelectDifficulty extends React.Component<PropsSelectDifficulty> {
  constructor(props: PropsSelectDifficulty) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <select className="select-difficulty" onChange={(event) => this.props.onChange(event.target.value)}>
        <Option value={0}></Option>
        <Option value={1}></Option>
        <Option value={2}></Option>
        <Option value={3}></Option>
        <Option value={4}></Option>
        <Option value={5}></Option>
      </select>
    );
  }
}

function Option(props: {
  value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  return <option>{props.value}</option>;
}

export default SelectDifficulty;
