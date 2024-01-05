import { IoAlarmOutline, IoStopwatchOutline, IoTimeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import SideButton from './SideButton';
import './SideBar.scss';
function SideBar() {
    return (
        <div id="side-bar" className="glass">  
            <SideButton 
                icon= {<IoAlarmOutline size="48" color="white" />} 
                label="자명종" 
                link="/reminder"    
            />
            <SideButton 
                icon={<IoIosTimer size="48" color="white" />} 
                label="타이머" 
                link="/timer" 
            />
            <SideButton 
                icon={<IoStopwatchOutline size="48" color="white" />} 
                label="스톱워치" 
                link="/stopwatch"
            />
            <SideButton 
                icon={<IoTimeOutline size="48" color="white" />} 
                label="시계" 
                link="/clock"
            />
            <SideButton 
                icon={<IoSettingsOutline size="48" color="white" />} 
                label="설정" 
                link="/setting"
            />
        </div>
    );
} 

export default SideBar;
