import { useState } from 'react';
import './TimePicker.scss';
import TimeSelector from './TimeSelector.js';

import { useDispatch } from 'react-redux';
import { setInitialDuration, setDuration } from '../../redux/actions';

const TimePicker = ({ updateTitle, closeModal }) => {
    const dispatch = useDispatch();

    const [hr, setHr] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [title, setTitle] = useState("타이머");

    const handleIncrement = (value, max, onChange) => {
        if (value < max) {
            onChange((prev) => prev + 1);
        }
    };

    const handleDecrement = (value, onChange) => {
        if (value > 0) {
            onChange((prev) => prev - 1);
        }
    };

    return (
        <div id="time-picker">
            <div id="title-input">
                <label>제목</label>
                <input
                    className="glass" 
                    value={title} 
                    type="text" 
                    placeholder="타이머 제목" 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div id="time-pick">
                <TimeSelector label="시간" value={hr} onChange={setHr} onIncrement={handleIncrement} onDecrement={handleDecrement} max={100} />
                <TimeSelector label="분" value={min} onChange={setMin} onIncrement={handleIncrement} onDecrement={handleDecrement} max={60} />
                <TimeSelector label="초" value={sec} onChange={setSec} onIncrement={handleIncrement} onDecrement={handleDecrement} max={60} />
            </div>
            <button onClick={() => {
                // 현재 initialDuration을 localStorage에 저장
                localStorage.setItem('initialDuration', JSON.stringify({ hr, min, sec }));

                // 현재 initialDuration을 Redux 상태로 디스패치
                dispatch(setInitialDuration({ hr, min, sec }));
                dispatch(setDuration({ hr, min, sec }));
                // 나머지 로직 실행
                updateTitle(title);
                closeModal();
            }}>
                선택
            </button>
        </div>
    );
};

export default TimePicker;
