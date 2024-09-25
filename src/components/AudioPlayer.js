import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';
import audiopath from '../assets/sound.mp3';

const AudioPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 25);
          for (let i = 0; i < 100; i++) {
            ctx.lineTo(i * 2, 25 + Math.sin(i * 0.1 + Date.now() * 0.01) * 20);
          }
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render();
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.audio.current.pause();
      } else {
        playerRef.current.audio.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="audio-player-wrapper">
      <button onClick={toggleAudio} className="audio-player">
        {isPlaying ? (
          <>
            <span className="audio-text">click to stop</span>
            <canvas ref={canvasRef} width="200" height="50" className="audio-canvas" />
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="audio-icon"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span className="audio-text">click to play</span>
          </>
        )}
        <span className="audio-subtext">website theme</span>
      </button>
      <AudioPlayer
        ref={playerRef}
        src={audiopath}
        autoPlay={false}
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlay;