// CustomIntervalSetting.js

import React from 'react';

function CustomIntervalSetting({ directSettingEnabled, customInterval, handleCustomInterval, setDirectSettingEnabled }) {
  return (
    <>
      <label className={directSettingEnabled ? 'checked' : ''}>
        <input 
          type="radio" 
          name="interval" 
          value={-1}
          checked={directSettingEnabled}
          onChange={() => setDirectSettingEnabled()}
        />
        <span>직접 설정</span>
      </label>
      {directSettingEnabled && (
        <select
          value={customInterval}
          onChange={(e) => handleCustomInterval(e)}
        >
          {Array.from({ length: 60 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default CustomIntervalSetting;
