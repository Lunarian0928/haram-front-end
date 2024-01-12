// Timer.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLabel } from '../../redux/actions';
import BasicTimer from './BasicTimer';
import TimerSettingModal from './TimerSettingModal';

import './Timer.scss';

function Timer() {
  const dispatch = useDispatch();
  const [timerSettingModalIsOpen, setTimerSettingModalIsOpen] = useState(false);
  const { label } = useSelector((state) => state.timer);

  useEffect(() => {
    const storedLabel = localStorage.getItem('label');
    if (storedLabel) {
      dispatch(setLabel(storedLabel)); 
    } 
  }, [dispatch])

  const openTimerSettingModal = () => {
    setTimerSettingModalIsOpen(true);
  };

  const closeTimerSettingModal = () => {
    setTimerSettingModalIsOpen(false);
  };

  return (
    <div id="timer">
      <BasicTimer
        openTimerSettingModal={openTimerSettingModal}
      />
      <TimerSettingModal
        modalIsOpen={timerSettingModalIsOpen}
        closeModal={closeTimerSettingModal}
      />
      <div id="timer-label">
        <h2>{label}</h2>
      </div>
    </div>
  );
}

export default Timer;
