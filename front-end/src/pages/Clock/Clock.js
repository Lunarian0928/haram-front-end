import './Clock.scss';
import { useState, useEffect } from 'react';

import BasicClock from './BasicClock';
import LocalSettingModal from './LocalSettingModal';

function Clock() {
    const [country, setCountry] = useState("대한민국");
    const [timeZone, setTimeZone] = useState('Asia/Seoul');
    const [loading, setLoading] = useState(false);

    const initialDate = new Date().toLocaleString('en-US', { timeZone });
    const [currentTime, setCurrentTime] = useState({
        year: new Date(initialDate).getFullYear(),
        month: new Date(initialDate).getMonth() + 1,
        date: new Date(initialDate).getDate(),
        day: ["일", "월", "화", "수", "목", "금", "토"][new Date(initialDate).getDay()],
        hour: new Date(initialDate).getHours(),
        min: new Date(initialDate).getMinutes(),
        sec: new Date(initialDate).getSeconds(),
    });

    const [localSettingModalIsOpen, setLocalSettingModalIsOpen] = useState(false);

    const openLocalSettingModal = () => {
        setLocalSettingModalIsOpen(true);
    };

    const closeLocalSettingModal = () => {
        setLocalSettingModalIsOpen(false);
    };

    const handleTimeZone = (selectedCountry, selectedTimeZone) => {
        setCountry(selectedCountry);
        setTimeZone(selectedTimeZone);
        closeLocalSettingModal();
    };

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            const updatedDate = new Date().toLocaleString('en-US', { timeZone });
            setCurrentTime({
                year: new Date(updatedDate).getFullYear(),
                month: new Date(updatedDate).getMonth() + 1,
                date: new Date(updatedDate).getDate(),
                day: ["일", "월", "화", "수", "목", "금", "토"][new Date(updatedDate).getDay()],
                hour: new Date(updatedDate).getHours(),
                min: new Date(updatedDate).getMinutes(),
                sec: new Date(updatedDate).getSeconds(),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeZone]);

    return (
        <div id="clock">
            {
                <BasicClock time={currentTime} country={country} openLocalSettingModal={openLocalSettingModal} loading={loading} />
            }
            
            <LocalSettingModal modalIsOpen={localSettingModalIsOpen} closeModal={closeLocalSettingModal} country={country} timeZone={timeZone} handleTimeZone={handleTimeZone} />
        </div>
    );
}

export default Clock;
