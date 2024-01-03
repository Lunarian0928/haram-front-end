// Timer.js
import { useState } from 'react';
import BasicTimer from './BasicTimer';
import TimerSettingModal from './TimerSettingModal';

import './Timer.scss';

function Timer() {
  const [title, setTitle] = useState('<span>"</span>성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, <br/> 그리고 무엇보다 자신이 하고 있는 일에 대한 사랑, 하는 법을 배우는 것이다.<span>"</span>');
  const [timerSettingModalIsOpen, setTimerSettingModalIsOpen] = useState(false);

  const openTimerSettingModal = () => {
    setTimerSettingModalIsOpen(true);
  };

  const closeTimerSettingModal = () => {
    setTimerSettingModalIsOpen(false);
  };

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div id="timer">
      <BasicTimer
        openTimerSettingModal={openTimerSettingModal}
      />
      <TimerSettingModal
        modalIsOpen={timerSettingModalIsOpen}
        closeModal={closeTimerSettingModal}
        updateTitle={updateTitle}
      />
      <div id="timer-title">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </div>
  );
}

export default Timer;
