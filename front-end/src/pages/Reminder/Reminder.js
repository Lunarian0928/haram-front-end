import './Reminder.scss';
import './Scrollbar.scss';
import { FaPlus } from "react-icons/fa";
import { MdCreate, MdDelete } from "react-icons/md";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ToggleSwitch from './ToggleSwitch';

function Reminder() {
    const [reminderEls, setReminderEls] = useState([]);
    const [reminderOpacities, setReminderOpacities] = useState([]);

    useEffect(() => {
        axios.get("/api/reminder/read")
            .then((res) => {
                res.data.forEach(item => {
                    item.isActive = item.active;
                    item.isRepeating = item.repeating;
                    delete item.active;
                    delete item.repeating;
                });
    
                setReminderEls(res.data);
                setReminderOpacities(res.data.map(() => 1));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    const navigateModifyReminder = (reminderElement) => {
        console.log(reminderElement);
        navigate('/modify_reminder', { 
            state: { 
                id: reminderElement.id,
                timeMeridiem: reminderElement.timeMeridiem,
                timeHour: reminderElement.timeHour,
                timeMin: reminderElement.timeMin,
                days: reminderElement.days,
                specialDayYear: reminderElement.specialDayYear,
                specialDayMonth: reminderElement.specialDayMonth,
                specialDayDate: reminderElement.specialDayDate,
                specialDayDay: reminderElement.specialDayDay,
                holidayOption: reminderElement.holidayOption,
                label: reminderElement.label,
                isRepeating: reminderElement.isRepeating,
                repeatInterval: reminderElement.repeatInterval,
                repeatCount: reminderElement.repeatCount,
                isActive: reminderElement.isActive,
            }    
        })
    }
    const deleteReminderEl = (index) => {
        const newOpacities = [...reminderOpacities];
        newOpacities[index] = 'removing';
        setReminderOpacities(newOpacities);

        setTimeout(() => {
            axios.post('/api/reminder/delete', {
                id: reminderEls[index].id,
            })
            .then(() => {
            setReminderEls(prevReminderEls => 
                prevReminderEls.filter((_, idx) => idx !== index)
            );
            setReminderOpacities(prev => 
                prev.filter((_, idx) => idx !== index)
            );
            })
            .catch((err) => {
            console.log(err);
            })
        }, 300);
    };

    const toggleReminderEl = (index) => {
        const newActiveStatus = !reminderEls[index].isActive;
        axios.post('/api/reminder/update/active', { 
            id: reminderEls[index].id,
            isActive: newActiveStatus,
        })
        .then(() => {
            setReminderEls(prevReminderEls => 
                prevReminderEls.map((reminder, idx) => 
                    idx === index ? { ...reminder, isActive: newActiveStatus } : reminder
                )
            );
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div id="reminder">
            <div id="reminder-list">
                {
                    reminderEls.map((reminderElement, index) => (
                        <div 
                            key={index} 
                            className={`reminder-element glass ${reminderOpacities[index] === 'removing' ? 'removing' : ''}`} 
                            style={{ opacity: reminderOpacities[index] === 'removing' ? 0.5 : 1 }}>
                            <header>
                                <p>{(reminderElement.label !== "") ?  reminderElement.label : "알람"}</p>
                                <div className="button-list">
                                    <button onClick={() => navigateModifyReminder(reminderElement)}><MdCreate size="24" color="white" /></button>
                                    <button onClick={() => deleteReminderEl(index)}><MdDelete size="24" color="white" /></button>
                                </div>
                            </header>
                            <div className="reminder-content">
                                <div className="reminder-info">
                                    <p>{reminderElement.timeHour}:{reminderElement.timeMin}</p>
                                        {
                                            reminderElement.days.length === 0 ? 
                                                <p>
                                                    {reminderElement.specialDayYear}년 {reminderElement.specialDayMonth}월 {reminderElement.specialDayDate}일 ({reminderElement.specialDayDay})
                                                </p>
                                            : (
                                                ["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            fontWeight: reminderElement.days.includes(day) ? "bold" : "normal",
                                                            opacity: reminderElement.days.includes(day) ? 1 : 0.5,
                                                        }}
                                                    >
                                                        {day}{' '}
                                                    </span>
                                                )))
                                        }
                                </div>
                                <ToggleSwitch checked={reminderElement.isActive} handleToggle={() => toggleReminderEl(index)}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button id="add-reminder" className="glass" onClick={() => navigate("/add_reminder")}>
                <FaPlus size="48" color="white" />
            </button>
        </div>
    )
}

export default Reminder;
