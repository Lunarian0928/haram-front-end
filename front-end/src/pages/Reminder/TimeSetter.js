import './TimeSetter.scss';
import BasicSetter from './BasicSetter';

function TimeSetter({time, setTime}) {

    const meridiemOptions = ['오전', '오후'].map((meridiem, index) => {
        return (
            <option key={index} value={meridiem}>
                {meridiem}
            </option>
        );
    });

    const hourOptions = Array
                    .from({ length: 12 }, (_, index) => index + 1)
                    .map((hour, index) => {
                        return (
                            <option key={index} value={hour}>
                                {hour}
                            </option>
                        );
                    });
    const minOptions = Array
                    .from({ length: 60 }, (_, index) => index)
                    .map((min, index) => {
                        return (
                            <option key={index} value={min}>
                                {min}
                            </option>
                        );
                    });
    
    const handleHour = (hour) => {
        var newHour = hour;
        var newMeridiem = time.meridiem;
        if (newHour > 12) {
            newMeridiem = (time.meridiem === '오전') ? '오후' : '오전';
            newHour = 1;
        } else if (newHour < 1) {
            newMeridiem = (time.meridiem === '오전') ? '오후' : '오전';
            newHour = 12;
        }
    
        setTime(prevTime => ({
            ...prevTime,
            hour: newHour,
            meridiem: newMeridiem,
        }));
    }

    const handleMin = (min) => {
        var newMin = min;
        if (newMin < 0) {
            handleHour(time.hour - 1);
            newMin = 59;
        } else if (newMin >= 60) {
            
            handleHour(time.hour + 1);
            newMin = 0;
        }
    
        setTime(prevTime => ({
            ...prevTime,
            min: newMin,
        }));
    }

    const handleMeridiem = (meridiem) => {
        setTime(prevTime => ({
            ...prevTime,
            meridiem: meridiem,
        }));
    }

    const handleIncrement = (value, handleChange) => {
        handleChange(value + 1);
    };

    
    const handleDecrement = (value, handleChange) => {
        handleChange(value - 1);
    };

    return (
        <div id="time-setter">
            <BasicSetter 
                options={meridiemOptions} 
                value={time.meridiem}
                handleChange={handleMeridiem}
            />
            <BasicSetter 
                options={hourOptions} 
                label="시" 
                value={time.hour}
                max={12}   
                handleChange={handleHour}
                onIncrement={handleIncrement} 
                onDecrement={handleDecrement}
            />
            <BasicSetter 
                options={minOptions} 
                label="분" 
                value={time.min}
                max={59}
                handleChange={handleMin}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />
        </div>
    );
}

export default TimeSetter;