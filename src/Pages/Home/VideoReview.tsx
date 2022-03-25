import React from 'react';
import ReactPlayer from 'react-player';
import { YOUTUBE_VIDEO_URL, VIDEO_PREVIEW_URL } from '../../constants';
import './video-review.css';

function VideoReview() {
  return (
    <div className="video-section">
      <div className="video-section__icon"></div>
      <h2 className="home__title">Видео обзор</h2>
      <div className="player-wrapper">
        <div className="player-ratio">
          <ReactPlayer
            className="react-player"
            url={YOUTUBE_VIDEO_URL}
            width="100%"
            height="100%"
            light={VIDEO_PREVIEW_URL}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoReview;
