import React, { useEffect, useState } from 'react';
import cloudImage from '../assets/cloud.png';

const Clouds = () => {
  const createCloud = (initialPosition = false) => ({
    id: Math.random(),
    left: initialPosition ? Math.random() * 100 : -10 - Math.random() * 20,
    top: Math.random() * 60,
    scale: 0.5 + Math.random() * 0.5,
    speed: 0.05 + Math.random() * 0.1,
  });

  const initialClouds = () => {
    const clouds = [];
    for (let i = 0; i < 15; i++) {
      clouds.push(createCloud(true));
    }
    return clouds;
  };

  const [clouds, setClouds] = useState(initialClouds);

  useEffect(() => {
    const animateClouds = () => {
      setClouds(prevClouds =>
        prevClouds.map(cloud => {
          const newLeft = cloud.left + cloud.speed;
          
          if (newLeft > 110) {
            return createCloud();
          }

          return { ...cloud, left: newLeft };
        })
      );
    };

    const intervalId = setInterval(animateClouds, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clouds-container" style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
      {clouds.map(cloud => (
        <img
          key={cloud.id}
          src={cloudImage}
          alt="Cloud"
          className="cloud"
          style={{
            
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            transform: `scale(${cloud.scale})`,
          }}
        />
      ))}
    </div>
  );
};

export default Clouds;
