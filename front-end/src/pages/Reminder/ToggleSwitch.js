import React, { useState } from 'react';
import './ToggleSwitch.scss';
function ToggleSwitch ({checked, handleToggle}) {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={() => handleToggle()} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
