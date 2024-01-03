import { MdAdd } from "react-icons/md";
import { MdHorizontalRule } from "react-icons/md";

import './TimeSelector.scss';
function TimeSelector({ label, value, onChange, max, onIncrement, onDecrement }) {
    return (
        <div className="time-selector">
            <label>{label}</label>
            <div className="glass">
                <button onClick={() => onIncrement(value, max, onChange)}><MdAdd size={24}/></button>
                <select className="glass" value={value} onChange={(e) => onChange(Number(e.target.value))}>
                    {Array.from({ length: max }).map((_, index) => (
                        <option key={index} value={index}>
                            {index}
                        </option>
                    ))}
                </select>
                <button onClick={() => onDecrement(value, onChange)}><MdHorizontalRule size={24} /></button>
            </div>
        </div>
    );
}

export default TimeSelector;
