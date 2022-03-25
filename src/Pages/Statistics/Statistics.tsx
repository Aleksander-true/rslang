import React from 'react';
import Footer from '../../Components/Footer';
import StatisticsMain from './Components/StatisticsMain';
import StatisticsNone from './Components/StatisticsNone';
import './Statistics.css';

const Statistics = () => {
  const userID = localStorage.getItem('userId');

  return (
    <>
      <div className="statistics">
        <h2 className="page-title">Статистика</h2>
        {!userID ? <StatisticsNone /> : null}
        {userID ? <StatisticsMain userID={userID} /> : null}
      </div>
      <Footer />
    </>
  );
};

export default Statistics;
