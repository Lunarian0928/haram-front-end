import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDuration, setIsRunning, resetTimer } from '../../redux/actions';
import './BasicTimer.scss';
function BasicTimer({openTimerSettingModal}) {
  const dispatch = useDispatch();
  const { initialDuration, duration, isRunning } = useSelector((state) => state.timer);

  const toggleTimer = () => {
    dispatch(setIsRunning(!isRunning));
  };

  const resetTimerHandler = () => {
    dispatch(resetTimer());
    localStorage.removeItem('isRunning');
    localStorage.removeItem('duration');
  };

  return (
    <div id="basic-timer">
      <div id="clock">
        <span>{String(duration.hr).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(duration.min).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(duration.sec).padStart(2, '0')}</span>
      </div>
      <button onClick={resetTimerHandler}>리셋</button>
      <button onClick={() => openTimerSettingModal()}>시간 설정</button>
      <button onClick={toggleTimer}>{isRunning ? '중지' : '시작'}</button>
    </div>
  );
}

export default BasicTimer;
