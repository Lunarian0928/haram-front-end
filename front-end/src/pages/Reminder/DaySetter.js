import './DaySetter.scss';
import { MdOutlineCalendarMonth } from "react-icons/md";

import { useState, useEffect } from 'react';
import DaySettingCalendarModal from './DaySettingCalendarModal';

function DaySetter({days, specialDay, selectDay, selectSpecialDay}) {
    const [daySettingCalendarModalIsOpen, setDaySettingCalendarModalIsOpen] = useState(false);
    
    const buttons = ['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
        <button
            key={index}
            className={days.includes(day) ? 'active' : ''}
            onClick={() => selectDay(day)}
        >
            {day}
        </button>       
    ));
    
    const openDaySettingCalendarModal = () => {
        console.log("버튼 클릭함");
        setDaySettingCalendarModalIsOpen(true);
    };

    const closeDaySettingCalendarModal = () => {
        setDaySettingCalendarModalIsOpen(false);
    };

    useEffect(() => {
        console.log(daySettingCalendarModalIsOpen); 
    }, [daySettingCalendarModalIsOpen])
    return (
        <div id="day-setter">
            <DaySettingCalendarModal 
                modalIsOpen={daySettingCalendarModalIsOpen} 
                closeModal={closeDaySettingCalendarModal}
                selectSpecialDay={selectSpecialDay}
            />
            <div id="reminder-day">
                <p id="day-notice">
                    {
                        (specialDay.year !== 0) ?
                            `${specialDay.year}년 ${specialDay.month}월 ${specialDay.date}일 (${specialDay.day})` :
                            (days.length === 7) ?
                                "매일" :
                                <>
                                    매주
                                    {
                                        days
                                        .slice()
                                        .sort((a, b) => ['일', '월', '화', '수', '목', '금', '토'].indexOf(a) - ['일', '월', '화', '수', '목', '금', '토'].indexOf(b))
                                        .map((day, index) => (
                                            <span key={index}>
                                            {day}
                                            </span>
                                        ))
                                    }
                                </>
                    }
                </p>

                <button id="calendar-button" onClick={() => openDaySettingCalendarModal()}>
                    <MdOutlineCalendarMonth size="24" color="white" />
                        날짜 선택 
                </button>
            </div>
            
            {buttons}
        </div>
    );
}

export default DaySetter;