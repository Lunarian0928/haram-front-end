import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import './BasicSetter.scss';

function BasicSetter({ options, label, value, max, handleChange, onIncrement, onDecrement }) {
    return (
        <div className="basic-setter">
            {label && <label>{label}</label>}
            <div className="glass">
                {onIncrement && (
                    <button onClick={() => onDecrement(value, handleChange)}>
                        <MdChevronLeft size="24" color="white" />
                    </button>
                )}
                <select className="glass" value={value} onChange={(e) => handleChange(e.target.value)}>
                    {options}
                </select>
                {onDecrement && (
                    <button onClick={() => onIncrement(value, handleChange)}>
                        <MdChevronRight size="24" color="white" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default BasicSetter;
