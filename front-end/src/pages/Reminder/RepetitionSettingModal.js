import { MdClose } from "react-icons/md";
import './RepetitionSettingModal.scss';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import IntervalSetting from './IntervalSetting';
function RepetitionSettingModal({ modalIsOpen, closeModal, updateRepetition }) {
  const [checkedInterval, setCheckedInterval] = useState(5);
  const [checkedCount, setCheckedCount] = useState(3);  
  const [directSettingEnabled, setDirectSettingEnabled] = useState(false);
  const [customInterval, setCustomInterval] = useState(1);

  const handleCheckedInterval = (event) => {
    setDirectSettingEnabled(false);
    setCheckedInterval(parseInt(event.target.value, 10));
  };

  const handleCheckedCount = (event) => {
    setCheckedCount(parseInt(event.target.value, 10));
  };

  const handleCustomInterval = (event) => {
    setCustomInterval(parseInt(event.target.value, 10));
  }

  const handleDirectSettingEnabled = () => {
    setDirectSettingEnabled(true);
  }

  useEffect(() => {
    if (directSettingEnabled) {
      setCheckedInterval(customInterval);
    }
  }, [directSettingEnabled, customInterval])

  useEffect(() => {
    console.log(checkedInterval);
  }, [checkedInterval])
  const countRadios = [3, 5, -1].map((count, index) => {
    return (
      <label key={index} className={checkedCount === count ? 'checked' : ''}>
        <input 
          type="radio" 
          name="count" 
          value={count}
          checked={checkedCount === count}
          onChange={(e) => handleCheckedCount(e)}
        />
        <span>{(count !== -1) ? `${count}회` : `계속 반복`}</span>
      </label>
    )
  })
  return (
    <div id="repetition-setting-modal">
      <div className="glass">
        <Modal
          isOpen={modalIsOpen} 
          onRequestClose={closeModal}
          contentLabel="Repetition Setting Modal"
          appElement={document.getElementById('root')}
          className="repetition-setting-modal glass"
          overlayClassName="repetition-setting-overlay"
        >
          <header>
            <h2>반복</h2>
            <button onClick={closeModal}><MdClose size={24}/></button>
          </header>
          <IntervalSetting
            intervals={[5, 10, 15, 30]}
            checkedInterval={checkedInterval}
            handleCheckedInterval={handleCheckedInterval}

            directSettingEnabled={directSettingEnabled}
            setDirectSettingEnabled={handleDirectSettingEnabled}
            customInterval={customInterval}
            handleCustomInterval={handleCustomInterval}
          />
          <div id="count-setting">
            <h3>반복</h3>
            {countRadios}
          </div>
          <button onClick={() => updateRepetition(checkedInterval, checkedCount)}>저장</button>
        </Modal>
      </div>
    </div>
  );
}

export default RepetitionSettingModal; 
