import './Reminder.scss';
import './Scrollbar.scss';
import { FaPlus } from "react-icons/fa";
import { MdCreate, MdDelete } from "react-icons/md";


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ToggleSwitch from './ToggleSwitch';
function Reminder() {
    class Time {
        constructor (hour, min) {
            this.hour = hour;
            this.min = min;
        }
    }

    class ReminderElement {
        constructor(label, time, day, isRepeating=true, repeatInterval=5) {
            this.label = label;
            this.time = time;
            this.day = day;
            this.isRepeating = isRepeating;
            this.repeatInterval = repeatInterval;
        }
    }
    const [reminders, setReminders] = useState([
        new ReminderElement("테스트", new Time(13, 15), ["월", "수", "금"]),
        new ReminderElement("테스트", new Time(13, 15), ["월", "목",]),
        new ReminderElement("테스트", new Time(13, 15), ["금"]),
        new ReminderElement("테스트", new Time(13, 15), ["월", "수", "금"]),
    ]);
    
    const [currentTime, setCurrentTime] = useState({
        day: ["일", "월", "화", "수", "목", "금", "토"][new Date().getDay()],
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
    });
    
    const checkReminders = () => {
        if (reminders[0].day.includes(currentTime.day)) {
            console.log("성공");
        }
    }
    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setCurrentTime({
                day: ["일", "월", "화", "수", "목", "금", "토"][new Date().getDay()],
                hour: new Date().getHours(),
                min: new Date().getMinutes(),
            }); 
            checkReminders();
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);
    
    const navigate = useNavigate();
    return (
        <div id="reminder">
            <div id="reminder-list">
                {
                    reminders.map((reminderElement, index) => {
                        return (
                            <div key={index} className="reminder-element glass">
                                <header>
                                    <p>{reminderElement.label}</p>
                                    <div className="button-list">
                                        <button><MdCreate size="24" color="white" /></button>
                                        <button><MdDelete size="24" color="white" /></button>
                                    </div>
                                </header>
                                <div className="reminder-content">
                                    <div className="reminder-info">
                                        <p>{reminderElement.time.hour}:{reminderElement.time.min}</p>
                                        
                                            {["월", "화", "수", "목", "금", "토", "일"].map((day, dayIndex) => (
                                            <span
                                                key={dayIndex}
                                                style={{
                                                    fontWeight: reminderElement.day.includes(day) ? "bold" : "normal",
                                                    opacity: reminderElement.day.includes(day) ? 1 : 0.5,
                                                }}
                                            >
                                                {day}{' '}
                                            </span>
                                            ))}
                                        
                                    </div>
                                    {/* <ToggleSwitch /> */}
                                </div>
                                
                                
                            </div>
                        );
                    })
                }
                
            </div>
            <button id="add-reminder" className="glass" onClick={() => navigate("/add_reminder")}>
                <FaPlus size="48" color="white" />
            </button>
        </div>
    )
}

export default Reminder;