import Calendar from 'react-calendar';
import moment from 'moment';
import './MiniCalendar.scss';
function MiniCalendar() {
    class Indicator {
        constructor(color, meaning) {
            this.color = color;
            this.meaning = meaning;
        }
    }
    const indicatorList = [
        new Indicator("green", "집중 성공") 
    ];
    return (
        <div id="mini-calendar">
            <Calendar 
                formatDay={(locale, date) => moment(date).format("D")}
                tileContent={<div className="dot"></div>}
            />
        </div>
    );
}

export default MiniCalendar; 