import './BasicClock.scss';

function BasicClock({ time, country, openLocalSettingModal, loading }) {
    return (
        <div id="basic-clock" className="dark-glass">
            <div id="date">
                <p>{time.year}년 {time.month}월 {time.date}일 {time.day}</p>
                <button onClick={() => openLocalSettingModal()}>{country} </button>
            </div>
            <div id="time">
                <div>
                    <p>{String(time.hour).padStart(2, '0')}</p>
                    <p>hour</p>
                </div>
                <div>
                    <p>{String(time.min).padStart(2, '0')}</p>
                    <p>min</p>
                </div>
                <div>
                    <p>{String(time.sec).padStart(2, '0')}</p>
                    <p>sec</p>
                </div>
            </div>
        </div>
    );
}

export default BasicClock;
