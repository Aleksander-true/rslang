import React from 'react';
import './advantages.css';
import './home.css';
import Advantages from './Advantages';
import VideoReview from './VideoReview';
import Team from './Team';

function Home() {
  return (
    <div className="home">
      <Advantages />
      <VideoReview />
      <Team />
    </div>
  );
}

export default Home;
