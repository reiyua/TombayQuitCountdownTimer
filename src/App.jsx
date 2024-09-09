import React, { useState, useEffect } from 'react';
import './Countdown.css';

const RetirementCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [prevTimeLeft, setPrevTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const retirementDate = new Date('2025-09-02'); // Replace with your retirement date
    const now = new Date();
    const difference = retirementDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setPrevTimeLeft(timeLeft); // Store the previous time
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="countdown-container">
      <h1 className="countdown-title">Tombay retires in:</h1>
      {Object.keys(timeLeft).length > 0 ? (
        <div className="countdown">
          <FlipUnit number={timeLeft.days} prevNumber={prevTimeLeft.days} label="Days" />
          <FlipUnit number={timeLeft.hours} prevNumber={prevTimeLeft.hours} label="Hours" />
          <FlipUnit number={timeLeft.minutes} prevNumber={prevTimeLeft.minutes} label="Minutes" />
          <FlipUnit number={timeLeft.seconds} prevNumber={prevTimeLeft.seconds} label="Seconds" />
        </div>
      ) : (
        <h1>Congratulations! You're retired!</h1>
      )}
    </div>
  );
};

// FlipUnit component handles the animation for each unit
const FlipUnit = ({ number, prevNumber, label }) => {
  return (
    <div className="countdown-section">
      <div className={`flip-card ${number !== prevNumber ? 'animate' : ''}`}>
        <span className="countdown-number">{number}</span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
};

export default RetirementCountdown;
