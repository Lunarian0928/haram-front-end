import { useNavigate } from 'react-router-dom';
import './SideButton.scss';
function SideButton({icon, label, link}) {
    const navigate = useNavigate();

    return (
        <div className="side-button" onClick={() => navigate(link)}>
            {icon}
            <p>{label}</p>
        </div>
    );
} 

export default SideButton;