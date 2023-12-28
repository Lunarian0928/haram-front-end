import React, { useState, useRef, useEffect } from 'react';
import BasicTimer from './BasicTimer'; // 기본 타이머
import TimerSettingModal from './TimerSettingModal'; // 타이머 시간 설정 모달
import ResultModal from './ResultModal'; // 결과 모달 (수정 필요)
import ReactAudioPlayer from 'react-audio-player'; // 타이머 종료 알람음 플레이어

import './Timer.scss';

function Timer() {
  // 타이머 제목
  const [title, setTitle] = useState('<span>"</span>성공은 우연이 아니다. 노력, 인내, 배움, 공부, 희생, <br/> 그리고 무엇보다 자신이 하고 있는 일에 대한 사랑, 하는 법을 배우는 것이다.<span>"</span>');
  // 타이머 설정 시간 
  const [timerDuration, setTimerDuration] = useState({ hr: 0, min: 0, sec: 1 });
  // 타이머 종료 여부 
  const [timerEnded, setTimerEnded] = useState(false);
  // 타이머 시간 설정 모달이 열려있는지 여부
  const [timerSettingModalIsOpen, setTimerSettingModalIsOpen] = useState(false);
  // 결과 모달이 열려있는지 여부
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  
  const audioRef = useRef(null); // ReactAudioPlayer 태그를 가리킴
  const [playCnt, setPlayCnt] = useState(0); // 알람이 재생된 횟수

  useEffect(() => {
    const playAlarm = () => { 
      audioRef.current.audioEl.current.play(); // 오디오를 재생
      audioRef.current.audioEl.current.addEventListener('ended', function () { // 오디오 재생이 종료되었다면
        audioRef.current.audioEl.current.currentTime = 0; // 현재 오디오의 재생 위치를 0초로 설정
        setPlayCnt((prevCnt) => { 
          if (prevCnt < 2) {  // 재생 횟수가 3번을 초과하지 않는다면
            audioRef.current.audioEl.current.play(); // 오디오를 다시 재새 
          } else { // 재생 횟수가 3번을 초과하였다면
            setTimerEnded(false); // 재생을 끝마침
          }
          console.log(prevCnt);
          return prevCnt + 1; // 재생 횟수 업데이트
        });
      });
    };
  
    if (timerEnded) {
      setResultModalIsOpen(true); // 
      playAlarm(); // 
    }
  }, [timerEnded]); // 타이머가 종료되었을 경우

  const handleTimerEnd = () => { // 타이머가 종료되었을 경우 타이머 종료 여부를 업데이트
    setTimerEnded(true);
  };

  const openTimerSettingModal = () => { // 타이머 시간 설정 모달을 열기 위한 함수
    setTimerSettingModalIsOpen(true);
  };

  const closeTimerSettingModal = () => { // 타이머 시간 설정 모달을 닫기 위한 함수
    setTimerSettingModalIsOpen(false);
  };

  const closeResultSettingModal = () => { // 결과 모달을 닫기 위한 함수
    setResultModalIsOpen(false);
  };

  const updateTitle = (newTitle) => { // 타이머 제목을 업데이트하기 위한 함수
    setTitle(newTitle);
  };

  const updateDuration = (newValues) => { // 타이머 시간을 설정하기 위한 함수
    setTimerDuration((prevDuration) => ({
      ...prevDuration,
      ...newValues,
    }));
    closeTimerSettingModal();
  };

  return (
    <div id="timer">
      {/* 기본 타이머 */}
      <BasicTimer 
        initialDuration={timerDuration} // 타이머 시간
        onTimerEnd={handleTimerEnd} // 타이머가 종료되었을 때 실행되는 함수
        openTimerSettingModal={openTimerSettingModal} // 타이머 시간 설정 모달을 열기 위한 함수
      />
      {/* 타이머 시간 설정 모달 */}
      <TimerSettingModal
        modalIsOpen={timerSettingModalIsOpen} // 타이머 시간 설정 모달이 열려있는지 여부
        closeModal={closeTimerSettingModal} // 타이머 시간 설정 모달을 닫기 위한 함수
        updateDuration={updateDuration} // 타이머 시간을 설정하기 위한 함수
        updateTitle={updateTitle} // 타이머 제목을 업데이트하기 위한 함수
      />

      {/* 결과 모달 */}
      <ResultModal
        modalIsOpen={resultModalIsOpen} // 결과 모달이 열려있는지 여부
        closeModal={closeResultSettingModal} // 결과 모달을 닫기 위한 함수
      />
      
      {/* 타이머 종료 알람음 플레이어 */}
      <ReactAudioPlayer
        ref={audioRef} // ReactAudioPlayer 태그를 가리킴
        src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`} // 오디오 경로
        autoPlay={false} // 자동 재생 여부
        controls={false} // 컨트롤러(플레이어) UI 표시 여부
      />
      {/* 타이머 제목 */}
      <div id="timer-title">
        <h1 dangerouslySetInnerHTML={{ __html: title }} /> {/* 타이머 제목을 html로 표현 */}
      </div>
    </div>
  );
}

export default Timer;
