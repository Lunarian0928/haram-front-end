  // 기본 타이머
  import { useState, useEffect } from 'react';
  import './BasicTimer.scss';
  function BasicTimer ({ initialDuration, onTimerEnd, openTimerSettingModal }) {
    const [duration, setDuration] = useState(initialDuration); // 설정 시간
    const [isRunning, setIsRunning] = useState(false); // 재생 여부

    useEffect(() => {
      let interval; 

      if (isRunning) { // 타이머가 재생되고 있는 경우
        interval = setInterval(() => {
          if (duration.hr === 0 && duration.min === 0 && duration.sec === 0) { // 0시간 0분 0초가 되면
            clearInterval(interval); // 주기적으로 실행되고 있는 setInterval 함수를 종료
            setIsRunning(false); // 재생 종료
            onTimerEnd(); // 콜백을 통해 타이머 종료 이벤트 전달
          } else {
            setDuration((prevDuration) => {
              if (prevDuration.sec === 0) {
                if (prevDuration.min === 0) { 
                  return { // 시간을 감소
                    hr: prevDuration.hr - 1,
                    min: 59,
                    sec: 59,
                  };
                }
                return { // 분을 감소
                  ...prevDuration,
                  min: prevDuration.min - 1,
                  sec: 59,
                };
              }
              return { // 초를 감소
                ...prevDuration,
                sec: prevDuration.sec - 1,
              };
            });
          }
        }, 1000); // // 함수를 1000ms(1초) 간격으로 실행
      }
      return () => clearInterval(interval); // 컴포넌트가 unmount될 때 setInterval 함수를 종료
    }, [isRunning, duration, onTimerEnd]); // 실행이 되거나, 타이머 시간이 바뀌거나, 타이머가 종료되면 실행됨

    useEffect(() => { // 시간이 새로 설정되었을(initialDuration) 경우, 타이머 시간(duration) 업데이트
      setDuration(initialDuration);
    }, [initialDuration]);
    
    const toggleTimer = () => { // 시작/중지 버튼을 토글할 수 있도록 함
      setIsRunning(!isRunning);
    };

    const resetTimer = () => { // 타이머 시간(duration)을 설정한 시간(initialDuration)으로 초기화
      setDuration(initialDuration);
    };

    return (
      <div id="basic-timer">
        <div id="clock">
          <span>{String(duration.hr).padStart(2, '0')}</span> {/* 시 */}
          <span>:</span>
          <span>{String(duration.min).padStart(2, '0')}</span> {/* 분 */}
          <span>:</span>
          <span>{String(duration.sec).padStart(2, '0')}</span> {/* 초 */}
        </div>
        <button onClick={resetTimer}>리셋</button> {/* 시간 초기화 버튼 */}
        <button onClick={openTimerSettingModal}>시간 설정</button> {/* 시간 설정 버튼 */}
        <button onClick={toggleTimer}> {/* 시작/중지 버튼 */}
          {isRunning ? '중지' : '시작'}
        </button>
      </div>
    );
  };

  export default BasicTimer;
