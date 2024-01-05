import './AddReminder.scss';
import { MdClose } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";

import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import TimeSetter from './TimeSetter';

import DaySetter from './DaySetter';
import RepetitionSettingModal from './RepetitionSettingModal';

function AddReminder() {
    // 알람 시간
    const [time, setTime] = useState({
        meridiem: "오전",
        hour: 6,
        min: 0,
    });

    const today = new Date();
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    
    // 알람 요일 설정
    const [days, setDays] = useState([]);
    // 알람 특정 날짜 설정
    const [specialDay, setSpecialDay] = useState({
        year: tomorrowDate.getFullYear(),
        month: tomorrowDate.getMonth() + 1,
        date: tomorrowDate.getDate(),
        day: ["일", "월", "화", "수", "목", "금", "토"][tomorrowDate.getDay()],
    });
    // 공휴일 끄기 옵션
    const [holidayOption, setHolidayOption] = useState(false);
    // 알람 이름
    const [label, setLabel] = useState("");
    // 다시 울림
    const [repetition, setRepetition] = useState({
        isRepeating: false,
        interval: 5,
        count: 3,
    });

    const [repetitionSettingModalIsOpen, setRepetitionSettingModalIsOpen] = useState(false);
    
    const selectDay = (selectedDay) => {
        if (days.includes(selectedDay)) {
            setDays(days.filter(day => day !== selectedDay));
        } else {
            setDays([...days, selectedDay]);
        }
    };

    const selectSpecialDay = (selectedDate) => {
        setSpecialDay({
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            date: selectedDate.getDate(),
            day: ["일", "월", "화", "수", "목", "금", "토"][selectedDate.getDay()],
        });
        setDays([]);
    }

    const toggleHolidayOption = () => {
        setHolidayOption(!holidayOption);
    } 
    
    const toggleRepetition = () =>{
        setRepetition(prevRepetition => ({
            ...prevRepetition,
            isRepeating: !prevRepetition.isRepeating
        }));
    }
    
    const openRepetitionSettingModal = () => {
        setRepetitionSettingModalIsOpen(true);
    };

    const closeRepetitionSettingModal = () => {
        setRepetitionSettingModalIsOpen(false);
    };

    const updateRepetition = (interval, count) => {
        setRepetition({
            isRepeating: true,
            interval: interval,
            count: count,
        });
        closeRepetitionSettingModal();
    }

    useEffect(() => {
        if (days.length !== 0) {
            setSpecialDay({
                year: 0,
                month: 0,
                date: 0,
                day: 0,
            })
        } else {
            setSpecialDay({
                year: tomorrowDate.getFullYear(),
                month: tomorrowDate.getMonth() + 1,
                date: tomorrowDate.getDate(),
                day: ["일", "월", "화", "수", "목", "금", "토"][tomorrowDate.getDay()],
            });
        }
    }, [days])
    const saveTest = () => {
        console.log("Time:", time);
        console.log("Days:", days.sort((a, b) => ['일', '월', '화', '수', '목', '금', '토'].indexOf(a) - ['일', '월', '화', '수', '목', '금', '토'].indexOf(b)));
        console.log("Special Day:", specialDay);
        console.log("Holiday Option:", holidayOption);
        console.log("Label:", label);
        console.log("Repetition:", repetition);
    }

    return (
        <div id="add-reminder">
            <RepetitionSettingModal 
                modalIsOpen={repetitionSettingModalIsOpen} 
                closeModal={closeRepetitionSettingModal} 
                updateRepetition={updateRepetition}
            />
            <div className="glass">
                <header>
                    <h2>알람 추가</h2>
                    <button><MdClose size="24" color="white" /></button>
                </header>
                <div id="extra-setter" className="glass">
                    <TimeSetter time={time} setTime={setTime} />
                    <DaySetter 
                        days={days} 
                        specialDay={specialDay} 
                        selectDay={selectDay} 
                        selectSpecialDay={selectSpecialDay}
                    />
                    <div id="holiday-setter">
                        <div>
                            <p>공휴일에는 끄기</p> 
                            <p>대체 공휴일 및 임시 공휴일 제외</p>
                        </div>
                        <ToggleSwitch checked={holidayOption} handleToggle={toggleHolidayOption} />
                    </div>
                    <div id="label-setter">
                        <input
                            value={label} 
                            type="text" 
                            placeholder="알람 제목" 
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                    <div id="alarm-setter">
                    </div>
                    <div id="repeat-interval-setter">
                        <div>
                            <p>다시 울림</p>
                            <p>
                                {
                                    repetition.isRepeating ?
                                    (repetition.count === -1 ?
                                        `${repetition.interval}분, 계속 반복`
                                        :
                                        `${repetition.interval}분, ${repetition.count}회`)
                                    :
                                    "사용 안함"
                                }
                            </p>
                        </div>
                        <div className="button-list">
                            <ToggleSwitch checked={repetition.isRepeating} handleToggle={toggleRepetition} />
                            <button onClick={() => {openRepetitionSettingModal()}}>
                                <IoEllipsisVertical size="24" color="white" />
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className="button-list">
                    <button>취소</button>
                    <button onClick={() => saveTest()}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default AddReminder;