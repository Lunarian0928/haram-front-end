import './ReminderAlarmModal.scss';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ReactAudioPlayer from 'react-audio-player';

function ReminderAlarmModal({modalIsOpen, closeModal, endedReminderId}) {
    const [reminderId, setReminderId] = useState(0);
    const [label, setLabel] = useState("");
    const [time, setTime] = useState({
        meridiem: '오전',
        hr: 0,
        min: 0,
    });

    const [alarmCount, setAlarmCount] = useState(0);
    const [repetition, setRepetition] = useState({
        isRepeating: false,
        repeatInterval: 5,
        repeatCount: 3,
    });
    const [repeatCount, setRepeatCount] = useState(1);
    
    const audioRef = useRef(null);

    useEffect(() => {
        setReminderId(endedReminderId || 0);
    }, [endedReminderId]);

    useEffect(() => {
        if (reminderId === 0) return;
        axios.post("/api/reminder/read_by_id", {
            id: reminderId,
        })
        .then((res) => {
            for (const key in res.data) {
                if (Object.prototype.hasOwnProperty.call(res.data, key)) {
                    if (key === 'active') {
                        res.data.isActive = res.data[key];
                        delete res.data[key];
                    } else if (key === 'repeating') {
                        res.data.isRepeating = res.data[key];
                        delete res.data[key];
                    }
                }
            }
            setLabel(res.data.label);
            setTime({meridiem: res.data.timeMeridiem, hr: res.data.timeHour, min: res.data.timeMin});
            setRepetition({
                isRepeating: res.data.isRepeating,
                repeatCount: res.data.repeatCount,
                repeatInterval: res.data.repeatInterval,
            })
            
            if (reminderId === 0) return;
        })
        .catch((err) => {
            console.log(err);
        })
    }, [reminderId]);
    
    const playAlarm = () => {
        console.log(repetition.isRepeating);
        if (audioRef !== null && audioRef.current !== null) {
            const audioElement = audioRef.current.audioEl.current;

            if (repetition.isRepeating) {
                const handleAudioEnd = () => {
                    audioElement.removeEventListener('ended', handleAudioEnd);

                    setAlarmCount((prevCnt) => {
                        if (prevCnt < repetition.repeatCount - 1) {
                            audioElement.currentTime = 0;
                            audioElement.play();
                            audioElement.addEventListener('ended', handleAudioEnd);
                        }
                        return prevCnt + 1;
                    });
                };

                audioElement.addEventListener('ended', handleAudioEnd);
                audioElement.play();
            } else {
                // Handle non-repeating case
                audioElement.play();
            }
        }
        setAlarmCount(0);
    };
    const stopAlarm = () => {
        if (audioRef !== null && audioRef.current !== null) {
            const audioElement = audioRef.current.audioEl.current;
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    }

    useEffect(() => {
        playAlarm();
    }, [repetition]);

    useEffect(() => {
        console.log(alarmCount);
    }, [alarmCount])

    const turnOffAlarm = () => {
        stopAlarm();
        closeModal();
    }
    
    return (
        <div id="reminder-alarm-mdoal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Reminder Alarm Modal"
                appElement={document.getElementById('root')}
                className="reminder-alarm-modal glass"
                overlayClassName="reminder-alarm-overlay"
            >   
                <ReactAudioPlayer
                    ref={audioRef}
                    src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`}
                    autoPlay={false}
                    controls={false}
                />
                <button onClick={() => playAlarm()}>알람 테스트</button>
                <p>{label === "" ? "알람" : label}</p>
                <p>
                    {
                        (time.meridiem === "오전" ? time.hr : time.hr + 12).toString().padStart(2, '0')}:{time.min.toString().padStart(2, '0')
                    }
                </p>
                <button className="glass" onClick={() => closeModal()}>끄기</button>
            </Modal>
        </div>
    );
}

export default ReminderAlarmModal;