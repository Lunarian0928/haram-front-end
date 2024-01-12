import { useDispatch } from 'react-redux';
import { setInitialDuration, setDuration, setLabel } from '../../redux/actions';
import './SpecialTimePicker.scss';
function SpecialTimePicker({ closeModal }) {
    const dispatch = useDispatch();
    class Time {
        constructor(hr = 0, min = 0, sec = 0) {
            this.hr = hr;
            this.min = min;
            this.sec = sec;
        }
    }

    const specialTimes = [
        new Time(0, 1),   // 1분
        new Time(0, 3),   // 3분
        new Time(0, 5),   // 5분
        new Time(0, 10),  // 10분
        new Time(0, 15),  // 15분
        new Time(0, 20),  // 20분
        new Time(0, 30),  // 30분
        new Time(0, 40),  // 40분
        new Time(0, 45),  // 45분
        new Time(1),      // 1시간
        new Time(2),      // 2시간
        new Time(4),      // 4시간
        new Time(8),      // 8시간
    ];

    return (
        <div id="special-time-picker">
            <p>특정 시간 타이머 설정</p>
            {
                specialTimes.map(
                    (time, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const formattedLabel = `${time.hr > 0 ? `${time.hr}시간` : ''} ${
                                    time.min > 0 ? `${time.min}분` : time.sec > 0 ? '1분' : ''
                                } ${time.sec > 0 ? `${time.sec}초` : ''} 타이머`;

                                localStorage.setItem('initialDuration', JSON.stringify({ hr: time.hr, min: time.min, sec: time.sec }));
                                dispatch(setInitialDuration({ hr: time.hr, min: time.min, sec: time.sec }));
                                dispatch(setDuration({ hr: time.hr, min: time.min, sec: time.sec }));

                                dispatch(setLabel(formattedLabel));
                                localStorage.setItem('label', formattedLabel);
                                closeModal();
                            }}
                        >
                            {time.hr > 0 ? `${time.hr}시간` : ''}
                            {time.min > 0 ? ` ${time.min}분` : ''}
                            {time.sec > 0 ? ` ${time.sec}초` : ''}
                        </button>
                    )
                )
            }
        </div>
    );
};

export default SpecialTimePicker;
