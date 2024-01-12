import './TimerAlarmModal.scss';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialDuration, setDuration, setIsRunning, resetTimer } from '../redux/actions';

import ReactAudioPlayer from 'react-audio-player';
import Modal from 'react-modal';

function TimerAlarmModal({}) {
    const dispatch = useDispatch();

    const [timerEnded, setTimerEnded] = useState(false);
    const { initialDuration, duration, isRunning } = useSelector((state) => state.timer);
    const [timerAlarmModalIsOpen, setTimerAlarmModalIsOpen] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // 타이머 시작 여부를 localStorage로 불러오기
        const storedIsRunning = localStorage.getItem('isRunning') === 'true'; 
        dispatch(setIsRunning(storedIsRunning)); // 타이머 시작 여부를 state로 저장하기

        const storedDuration = JSON.parse(localStorage.getItem('duration'));
        const storedInitialDuration = JSON.parse(localStorage.getItem('initialDuration'));
        if (storedInitialDuration) dispatch(setInitialDuration(storedInitialDuration));
        if (storedDuration && !(storedDuration.hr === 0 && storedDuration.min === 0 && storedDuration.sec === 0)) {
            dispatch(setDuration(storedDuration)); // 지금 타이머 시간으로 초기화
        } else {
            if (storedInitialDuration) {
                dispatch(setDuration(storedInitialDuration));
            }
            else {
                dispatch(setDuration(initialDuration));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // 타이머 재생
    useEffect(() => { 
        let interval;
        if (isRunning) {
            //  타이머 시작 여부를 localStorage에 저장하기
            localStorage.setItem('isRunning', 'true'); 
            interval = setInterval(() => {
            const nextDuration = calculateNextDuration(duration);
            dispatch(setDuration(nextDuration));
            //  타이머 시간을 localStorage에 저장하기
            localStorage.setItem('duration', JSON.stringify(nextDuration));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [dispatch, isRunning, duration]);

    const calculateNextDuration = (prevDuration) => {
        if (prevDuration.hr === 0 && prevDuration.min === 0 && prevDuration.sec === 0) {
            setTimerEnded(true);
            openModal();
            return prevDuration;
        }
        if (prevDuration.sec === 0) {
            if (prevDuration.min === 0) {
            return {
                hr: prevDuration.hr - 1,
                min: 59,
                sec: 59,
            };
            }
            return {
                hr: prevDuration.hr,
                min: prevDuration.min - 1,
                sec: 59,
            };
        }
        return {
            hr: prevDuration.hr,
            min: prevDuration.min,
            sec: prevDuration.sec - 1,
        };
    };

    const playAlarm = () => {
        if (audioRef !== null && audioRef.current !== null) {
            const audioElement = audioRef.current.audioEl.current;
            audioElement.play();
        }
    };

    useEffect(() => {
        if (timerEnded) {
            playAlarm();
            dispatch(setIsRunning(false));
            localStorage.setItem('isRunning', 'false');
        }
    }, [dispatch, timerEnded]);
    
    const openModal = () => {
        setTimerAlarmModalIsOpen(true);
    }

    const closeModal = () => {
        setTimerAlarmModalIsOpen(false) 
    }

    const turnOff = () => {
        closeModal();
        dispatch(resetTimer());
    }
    return (
        <div id="timer-alarm-mdoal">
            <Modal
                isOpen={timerAlarmModalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Timer Alarm Modal"
                appElement={document.getElementById('root')}
                className="timer-alarm-modal glass"
                overlayClassName="timer-alarm-overlay"
            >   
                <ReactAudioPlayer
                    ref={audioRef}
                    src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`}
                    autoPlay={false}
                    controls={false}
                    loop={true}
                    onCanPlay={() => playAlarm()}
                />
                <p>타이머 종료됨</p>
                <button className="glass" onClick={() => turnOff()}>끄기</button>
            </Modal>
        </div>
    );
}

export default TimerAlarmModal;