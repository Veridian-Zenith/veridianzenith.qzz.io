import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress > 80) setLoadingText('Finalizing...');
        else if (newProgress > 60) setLoadingText('Loading assets...');
        else if (newProgress > 40) setLoadingText('Preparing projects...');
        else if (newProgress > 20) setLoadingText('Loading particles...');
        else setLoadingText('Initializing...');
        return Math.min(newProgress, 100);
      });
    }, 200);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 1000);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
    >
      {/* BRIGHT BACKGROUND */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, #FF4500 0%, #FF8C00 30%, #000000 70%)',
          opacity: 0.8
        }}
      />

      {/* CENTERED CONTENT */}
      <div
        style={{
          textAlign: 'center',
          color: '#FFD700',
          zIndex: 10,
          padding: '40px'
        }}
      >
        {/* HUGE LOGO */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '0 0 30px #FFD700',
            marginBottom: '40px',
            animation: 'pulse 2s infinite'
          }}
        >
          VZ
        </div>

        {/* BIG TITLE */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#FF8C00',
            textShadow: '0 0 20px #FF8C00',
            marginBottom: '40px',
            letterSpacing: '4px'
          }}
        >
          VERIDIAN ZENITH
        </h1>

        {/* PROGRESS BAR - VERY VISIBLE */}
        <div
          style={{
            width: '500px',
            height: '30px',
            backgroundColor: '#333333',
            border: '3px solid #FF8C00',
            borderRadius: '15px',
            margin: '40px auto',
            boxShadow: '0 0 20px #FF8C00',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#FFD700',
              borderRadius: '12px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 15px #FFD700',
              position: 'relative'
            }}
          >
            {/* MOVING SPARK */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                boxShadow: '0 0 10px #FFFFFF',
                animation: 'blink 1s infinite'
              }}
            />
          </div>
        </div>

        {/* PERCENTAGE DISPLAY */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#FFB347',
            textShadow: '0 0 15px #FFB347',
            marginBottom: '20px'
          }}
        >
          {Math.round(progress)}%
        </div>

        {/* LOADING TEXT */}
        <div
          style={{
            fontSize: '24px',
            color: '#FFD700',
            textShadow: '0 0 10px #FFD700',
            marginBottom: '30px'
          }}
        >
          {loadingText}
        </div>

        {/* SPINNER */}
        <div style={{ marginBottom: '40px' }}>
          <LoadingSpinner size="lg" />
        </div>

        {/* STATUS */}
        <div
          style={{
            fontSize: '18px',
            color: '#FFA500',
            textShadow: '0 0 10px #FFA500'
          }}
        >
          Loading amazing projects...
        </div>
      </div>

      {/* FLOATING PARTICLES */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            backgroundColor: '#FF8C00',
            borderRadius: '50%',
            animation: `float ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 8px #FF8C00'
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
