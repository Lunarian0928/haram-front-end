import './RecordLabelSettingModal.scss';

import { useEffect } from 'react';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";

function RecordLabelSettingModal({modalIsOpen, closeModal, label, setLabel, saveLapRecord}) {
    useEffect(() => {
        const date = new Date();
        const defaultLabel = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초에 생성된 랩`;
        setLabel(defaultLabel);
    }, [modalIsOpen])
    return (
        <div id="record-label-setting-modal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Record Label Setting Modal"
                appElement={document.getElementById('root')}
                className="record-label-setting-modal glass"
                overlayClassName="record-label-setting-overlay"
            >
                <header>
                    <h2>랩 이름 설정</h2>
                    <button onClick={() => {
                        closeModal();
                    }}>
                        <MdClose size="24" color="black"/>
                    </button>
                </header>
                <div id="label-input-div">
                    <input 
                        className="glass"
                        type="text" 
                        placeholder="랩 이름"
                        value={label}
                        onChange={(e) => setLabel(e.currentTarget.value)}
                    />
                    <button onClick={() => saveLapRecord(label)}W>확인</button>
                </div>
            </Modal>
        </div>
    )
}
export default RecordLabelSettingModal;