import './Stopwatch.scss';

import React, { useState, useEffect } from 'react';
import TimeDisplayInStopwatch from './TimeDisplayInStopwatch';


function Stopwatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    const calculateTime = (milliseconds) => {
        return {
            hours: Math.floor(milliseconds / (1000 * 60 * 60)),
            minutes: Math.floor(milliseconds / (1000 * 60)) % 60,
            seconds: Math.floor(milliseconds / 1000) % 60
        };
    }

    const formatTimeUnit = (timeUnit) => {
        return String(timeUnit).padStart(2, '0');
    };

    const formatTime = (milliseconds, key) => {
        const calculatedTime = calculateTime(milliseconds);
        if (key) {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>
                        <TimeDisplayInStopwatch 
                            hours={formatTimeUnit(calculatedTime.hours)}
                            minutes={formatTimeUnit(calculatedTime.minutes)}
                            seconds={formatTimeUnit(calculatedTime.seconds)}
                            milliseconds={formatTimeUnit(milliseconds % 1000 / 10)}
                        />
                    </td>
                    <td>
                        <TimeDisplayInStopwatch 
                            hours={formatTimeUnit(calculatedTime.hours)}
                            minutes={formatTimeUnit(calculatedTime.minutes)}
                            seconds={formatTimeUnit(calculatedTime.seconds)}
                            milliseconds={formatTimeUnit(milliseconds % 1000 / 10)}
                        />
                    </td>
                </tr>
            );
        } else {
            return (
                <div id="basic-stopwatch">
                    <div className="time">
                        <TimeDisplayInStopwatch 
                            hours={formatTimeUnit(calculatedTime.hours)}
                            minutes={formatTimeUnit(calculatedTime.minutes)}
                            seconds={formatTimeUnit(calculatedTime.seconds)}
                            milliseconds={formatTimeUnit(milliseconds % 1000 / 10)}
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
            )
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10)
        }

        return () => clearInterval(interval);
    }, [isRunning])

    const toggleStopwatch = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const resetStopwatch = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };

    const recordLap = () => {
        setLaps(prevLaps => [...prevLaps, elapsedTime]);
    }

    return (
        <div id="stopwatch">
            {formatTime(elapsedTime)}
            <table id="laps" className="glass">
                <thead>
                    <tr>
                        <th>랩</th>
                        <th>세계 시각</th>
                        <th>총 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {laps.slice().reverse().map((lap, index) => (
                        formatTime(lap, (laps.length - index))
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stopwatch;
