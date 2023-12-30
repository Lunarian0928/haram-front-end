// UserInput.js
import React from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import './UserInput.scss';

function UserInput({ value, type, placeholder, onChange, icon, onCheckDuplicate, onBlur, noDuplicate, onToggleVisibility, onSendEmail }) {
  return (
    <div className="user-input">
      <div className="input-container">
        <div className="icon">{icon}</div>
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          onBlur={onBlur ? (e) => onBlur(e) : (e) => {}}
        />
        {onToggleVisibility && (
          <button className="toggle-button" onClick={onToggleVisibility}>
            {type === 'password' ? <IoMdEyeOff size="16" color="white" /> : <IoMdEye size="16" color="white" />}
          </button>
        )}
        {onCheckDuplicate && (
          <button className="check-duplicate-button" onClick={onCheckDuplicate} disabled={noDuplicate}>
            {!noDuplicate ? '중복체크' : '사용가능'}
          </button>
        )}
        {onSendEmail && (
          <button className="send-email-button" onClick={onSendEmail}>
            인증번호 전송
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInput;
