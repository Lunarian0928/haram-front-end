import { useState } from 'react';
import './TimePicker.scss';
import TimeSelector from './TimeSelector.js';
const TimePicker = ({ updateDuration, updateTitle }) => {
    const [hr, setHr] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [title, setTitle] = useState("타이머");

    const handleIncrement = (value, max, onChange) => {
        console.log("증가 버튼 누름");
        if (value < max) {
            onChange((prev) => prev + 1);
        }
    };
    
    const handleDecrement = (value, onChange) => {
        console.log("감소 버튼 누름");
        if (value > 0) {
            onChange((prev) => prev - 1);
        }
    };
    

    return (
        <div id="time-picker">
            <div id="title-input">
                <label>제목</label>
                <input 
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
            <button             
                    onClick={() => {
                        updateDuration({ hr: hr, min: min, sec: sec });
                        updateTitle(title);
                    }}>
                    선택
            </button>
        </div>
    );
};

export default TimePicker;
