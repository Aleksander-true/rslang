import React from 'react';
import StatisticsMain from './Components/StatisticsMain';
import StatisticsNone from './Components/StatisticsNone';

const Statistics = () => {
  const userID = localStorage.getItem('userId');

  return (
    <div className='statistics'>
      <h2>{"Статистика"}</h2>
      {!userID ? <StatisticsNone />  : null}
      {userID ? <StatisticsMain userID={userID}/> : null}
    </div>
  );
}


export default Statistics;


