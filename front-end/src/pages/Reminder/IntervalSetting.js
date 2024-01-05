// IntervalSetting.js

import React from 'react';
import IntervalRadio from './IntervalRadio';
import CustomIntervalSetting from './CustomIntervalSetting';

function IntervalSetting({ intervals, checkedInterval, handleCheckedInterval,  directSettingEnabled, setDirectSettingEnabled, customInterval, handleCustomInterval }) {
  return (
    <div id="interval-setting">
      <h3>간격</h3>
      {intervals.map((interval, index) => (
        <IntervalRadio
          key={index}
          interval={interval}
          checkedInterval={checkedInterval}
          directSettingEnabled={directSettingEnabled}
          handleCheckedInterval={handleCheckedInterval}
        />
      ))}
      <CustomIntervalSetting
        directSettingEnabled={directSettingEnabled}
        customInterval={customInterval}
        handleCustomInterval={handleCustomInterval}
        setDirectSettingEnabled={setDirectSettingEnabled}
      />
    </div>
  );
}

export default IntervalSetting;
