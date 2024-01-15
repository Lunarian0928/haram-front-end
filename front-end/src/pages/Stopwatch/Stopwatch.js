import './Stopwatch.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Lap from './Lap';
import TimeDisplayInStopwatch from './TimeDisplayInStopwatch';
import Record from './Record';
import RecordLabelSettingModal from './RecordLabelSettingModal';    
function Stopwatch() {
    // 스톱워치 작동 여부
    const [isRunning, setIsRunning] = useState(false);
    // 스톱워치 현재 시간
    const [elapsedTime, setElapsedTime] = useState(0);
    // 스톱워치 랩 이름
    const [label, setLabel] = useState("");
    // 스톱워치 랩 
    const [laps, setLaps] = useState([]);
    // 저장해놓은 스톱워치 랩 기록
    const [lapsRecords, setLapsRecords] = useState([]);

    const [recordLabelSettingModalIsOpen, setRecordLabelSettingModalIsOpen] = useState(false);
    
    // milliseconds to {hours, minutes, seconds, milliseconds}
    const calculateTime = (milliseconds) => {
        return {
            hours: Math.floor(milliseconds / (1000 * 60 * 60)),
            minutes: Math.floor(milliseconds / (1000 * 60)) % 60,
            seconds: Math.floor(milliseconds / 1000) % 60,
            milliseconds: milliseconds % 1000 / 10,
        };
    }
    
    // 랩 기록
    const recordLap = () => {
        setLaps(prevLaps => {
            const newLap = {
                lapNumber: prevLaps.length + 1,
                elapsedTime: elapsedTime,
                totalTime: calculateTime(elapsedTime),
            };
            
            if (prevLaps.length > 0) {
                newLap.worldTime = calculateTime(elapsedTime - prevLaps[prevLaps.length - 1].elapsedTime);
            } else {
                newLap.worldTime = newLap.totalTime;
            }

            return [...prevLaps, newLap];
        });
    }

    useEffect(() => {
        console.log(laps);
    }, [laps])

    // 스톱워치를 작동시켰을 경우 초 증가
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 10);
            }, 10)
        }
        
        return () => clearInterval(interval);
    }, [isRunning])

    const toggleStopwatch = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const resetStopwatch = () => {
        setElapsedTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    const recordLabelSettingModalOpen = () => {
        setRecordLabelSettingModalIsOpen(true);
    }
    const recordLabelSettingModalClose = () => {
        setRecordLabelSettingModalIsOpen(false);
    }

    // 랩 기록 읽어오기
    useEffect(() => {
        axios.get("/api//laps_record/read")
        .then((res) => {
            setLapsRecords(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [lapsRecords])

    // 랩 저장하기
    const saveLapRecord = (label) => {
        axios.post("/api/laps_record/save", {
            label: label,
            laps: laps,
        })
        .then((res) => {
            if (res.data) {
                recordLabelSettingModalClose();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    // 랩 csv로 export하기
    const exportToCsv = () => {
        // 서버에 보낼 데이터
        const dataToSend = {
            label: label,
            laps: laps,
        };
    
        // 서버에 POST 요청 보내기
        axios.post("/api/laps_record/export_to_csv", dataToSend, { responseType: 'arraybuffer' })
        .then((response) => {
            // 서버에서 받은 파일 데이터로 Blob 생성
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
    
            // Blob을 URL로 변환하여 다운로드 링크 생성
            const url = window.URL.createObjectURL(blob);
    
            // 다운로드 링크 생성 및 클릭
            const a = document.createElement('a');
            a.href = url;
            a.download = `${label}.csv`;
            document.body.appendChild(a);
            a.click();
    
            // 다운로드 후 URL 해제
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((error) => {
            console.error('Error exporting to CSV:', error);
        });
    };

    return (
        <div id="stopwatch">
            <RecordLabelSettingModal 
                modalIsOpen={recordLabelSettingModalIsOpen} 
                closeModal={recordLabelSettingModalClose}
                label={label}
                setLabel={setLabel}
                saveLapRecord={saveLapRecord}
            />
            <div id="basic-stopwatch">
                <div className="time">
                    <TimeDisplayInStopwatch
                        hours={calculateTime(elapsedTime).hours}
                        minutes={calculateTime(elapsedTime).minutes}
                        seconds={calculateTime(elapsedTime).seconds}
                        milliseconds={calculateTime(elapsedTime).milliseconds}
                    />
                </div>
                <div className="button-list">
                    <button onClick={() => toggleStopwatch()}>{!isRunning ? "시작" : "중지"}</button>
                    {
                        !isRunning ?
                            <button onClick={() => resetStopwatch()}>리셋</button> :
                            <button onClick={() => recordLap()}>랩</button>
                    }
                </div>
            </div>
            <div id="laps" className="glass">
                <div id="current-laps" className="glass">
                    <table className="laps-table">
                        <thead className="glass">
                            <tr>
                                <th>랩</th>
                                <th>세계 시각</th>
                                <th>총 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                laps.map((lap, _) => (
                                    <Lap lap={lap}/>
                                )).reverse()
                            }
                        </tbody>
                    </table>
                    <div className="button-list glass">
                        <button className="glass" onClick={() => recordLabelSettingModalOpen()}>
                            저장하기
                        </button>
                        <button className="glass" onClick={() => exportToCsv()}>csv 내보내기</button>
                    </div>
                </div>
                <div id="laps-record">
                    <header>
                        <h2>랩 목록</h2>
                    </header>
                    <div id="record-list">
                        {
                            lapsRecords.map((record, index) => (
                                <Record key={index} record={record} setLapsRecords={setLapsRecords}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;
