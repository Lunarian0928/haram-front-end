// Timer.js
import React, { useEffect, useRef, useState } from 'react';
import BasicTimer from './BasicTimer';
import TimerSettingModal from './TimerSettingModal';
import ResultModal from './ResultModal';
import ReactAudioPlayer from 'react-audio-player';
import './Timer.scss';

function Timer() {
  const [title, setTitle] = useState('<span>"</span>성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, <br/> 그리고 무엇보다 자신이 하고 있는 일에 대한 사랑, 하는 법을 배우는 것이다.<span>"</span>');
  const [timerEnded, setTimerEnded] = useState(false);
  const [timerSettingModalIsOpen, setTimerSettingModalIsOpen] = useState(false);
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);

  const audioRef = useRef(null);
  const [playCnt, setPlayCnt] = useState(0);

  useEffect(() => {
    const playAlarm = () => {
      audioRef.current.audioEl.current.play();
      audioRef.current.audioEl.current.addEventListener('ended', function () {
        audioRef.current.audioEl.current.currentTime = 0;
        setPlayCnt((prevCnt) => {
          if (prevCnt < 2) {
            audioRef.current.audioEl.current.play();
          } else {
            setTimerEnded(false);
          }
          return prevCnt + 1;
        });
      });
    };

    if (timerEnded) {
      setResultModalIsOpen(true);
      playAlarm();
    }
  }, [timerEnded]);

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const openTimerSettingModal = () => {
    setTimerSettingModalIsOpen(true);
  };

  const closeTimerSettingModal = () => {
    setTimerSettingModalIsOpen(false);
  };

  const closeResultSettingModal = () => {
    setResultModalIsOpen(false);
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
      <ResultModal
        modalIsOpen={resultModalIsOpen}
        closeModal={closeResultSettingModal}
      />
      <ReactAudioPlayer
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`}
        autoPlay={false}
        controls={false}
      />
      <div id="timer-title">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </div>
  );
}

export default Timer;
