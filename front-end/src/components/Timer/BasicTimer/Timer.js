import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = (duration) => {
  const timerProps = {
    isPlaying: true,
    duration: duration.hr * 3600 + duration.min * 60 + duration.sec, // 초 단위
    size: 320,
    strokeWidth: 12,
    colors: [['#004777']], 
    onComplete: () => console.log('타이머 완료!'),
  };
  
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const getHr = (remainingTime) => {
    return formatTime(Math.floor(remainingTime / 3600));
  };

  const getMin = (remainingTime) => {
    return formatTime(Math.floor((remainingTime % 3600) / 60));
  };

  const getSec = (remainingTime) => {
    return formatTime(Math.floor(remainingTime % 60));
  };

  return (
    <div id="countdown-circle-timer">
        <CountdownCircleTimer {...timerProps}>
        {
            ({ remainingTime }) => 
            <div className="timer">
                {getHr(remainingTime)}:{getMin(remainingTime)}:{getSec (remainingTime)}
            </div>
        }
        </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
