import './DaySettingCalendarModal.scss';
import { MdClose } from "react-icons/md";
import 'react-calendar/dist/Calendar.css'; 

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';


function DaySettingCalendarModal({modalIsOpen, closeModal, selectSpecialDay}) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDateSave = () => {
        selectSpecialDay(selectedDate);
        closeModal();
    }

    return (
        <div id="day-setting-calendar-modal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Day Setting Calendar Modal"
                appElement={document.getElementById('root')}
                className="day-setting-calendar-modal glass" // 커스텀 클래스를 추가합니다.
                overlayClassName="day-setting-calendar-overlay" // 오버레이에 대한 커스텀 클래스를 추가합니다.
            >
            <Calendar 
                onChange={(date) => handleDateChange(date)}
                value={selectedDate}
                tileDisabled={({ date }) => date < new Date()}
            />
            <div className="button-list">
                <button onClick={() => closeModal()}>취소</button>
                <button onClick={() => handleDateSave()}>완료</button>
            </div>
            </Modal>
        </div>
    );
}

export default DaySettingCalendarModal;