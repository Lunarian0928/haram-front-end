function IntervalRadio({ interval, checkedInterval, directSettingEnabled, handleCheckedInterval }) {
  return (
    <div>
      {(interval === 30) ? <br /> : null}
      <label className={!directSettingEnabled && (checkedInterval === interval) ? 'checked' : ''}>
        <input 
          type="radio" 
          name="interval" 
          value={interval}
          checked={!directSettingEnabled && (checkedInterval === interval)}
          onChange={(e) => handleCheckedInterval(e)}
        />
        <span>{`${interval}분`}</span>
      </label>
    </div>
  );
}

export default IntervalRadio;
