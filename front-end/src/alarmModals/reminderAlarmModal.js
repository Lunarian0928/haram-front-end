import './ReminderAlarmModal.scss';
import { MdClose } from "react-icons/md";
import Modal from 'react-modal';

function ReminderAlarmModal({modalIsOpen, closeModal}) {
    return (
        <div id="reminder-alarm-mdoal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Reminder Alarm Modal"
                appElement={document.getElementById('root')}
                className="reminder-alarm-modal glass"
                overlayClassName="reminder-alarm-overlay"
            >
            <header>
                <h2>알람</h2>
                <button onClick={closeModal}><MdClose size={24}/></button>
            </header>
                <p></p>
            </Modal>
        </div>
    );
}

export default ReminderAlarmModal;