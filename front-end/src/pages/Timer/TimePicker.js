import { useState } from 'react';
import './TimePicker.scss';
import TimeSelector from './TimeSelector.js';

import { useSelector, useDispatch } from 'react-redux';
import { setInitialDuration, setDuration, setLabel } from '../../redux/actions';

const TimePicker = ({ closeModal }) => {
    const dispatch = useDispatch();

    const [hr, setHr] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const { label } = useSelector((state) => state.timer);

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
            <div id="label-input">
                <label>제목</label>
                <input
                    className="glass" 
                    value={label} 
                    type="text" 
                    placeholder="타이머 제목" 
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div id="time-pick">
                <TimeSelector label="시간" value={hr} onChange={setHr} onIncrement={handleIncrement} onDecrement={handleDecrement} max={100} />
                <TimeSelector label="분" value={min} onChange={setMin} onIncrement={handleIncrement} onDecrement={handleDecrement} max={60} />
                <TimeSelector label="초" value={sec} onChange={setSec} onIncrement={handleIncrement} onDecrement={handleDecrement} max={60} />
            </div>
            <button onClick={() => {
                dispatch(setInitialDuration({ hr, min, sec }));
                dispatch(setDuration({ hr, min, sec }));
                localStorage.setItem('initialDuration', JSON.stringify({ hr, min, sec }));

                dispatch(setLabel(label));
                localStorage.setItem('label', label);
                closeModal();
            }}>
                선택
            </button>
        </div>
    );
};

export default TimePicker;
