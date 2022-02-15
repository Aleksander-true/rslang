import React from 'react';
import './advantages.css';
import './home.css';
import Advantages from './Advantages';
import VideoReview from './VideoReview';
import Footer from './../../Components/Footer';
import Team from './Team';

function Home() {
  return (
    <>
      <div className="home">
        <Advantages />
        <VideoReview />
        <Team />
      </div>
      <Footer />
    </>
  );
}

export default Home;
