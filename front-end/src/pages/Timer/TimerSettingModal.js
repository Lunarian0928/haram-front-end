import Modal from 'react-modal';
import { MdClose } from "react-icons/md";
import TimePicker from './TimePicker';
import SpecialTimePicker from "./SpecialTimePicker";
import './TimerSettingModal.scss';

function TimerSettingModal({modalIsOpen, closeModal, updateTitle}) {
  return (
    <div id="timer-setting-modal">
      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        contentLabel="Timer Setting Modal"
        appElement={document.getElementById('root')}
        className="timer-setting-modal glass" // 커스텀 클래스를 추가합니다.
        overlayClassName="timer-setting-overlay" // 오버레이에 대한 커스텀 클래스를 추가합니다.
      >
        <header>
          <h2>타이머 세팅</h2>
          <button onClick={closeModal}><MdClose size={24}/></button>
        </header>
        <TimePicker updateTitle={updateTitle} closeModal={closeModal} />
        <SpecialTimePicker updateTitle={updateTitle} closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default TimerSettingModal; 