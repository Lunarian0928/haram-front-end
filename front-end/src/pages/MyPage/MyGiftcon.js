import './MyGiftcon.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

function MyGiftcon() {
    const navigate = useNavigate();
    return (
        <div id="giftcon" className="glass">
            <header>
                <h1>기프트콘</h1>
                <button onClick={() => navigate("/my_page")}><FaArrowLeft /></button>
            </header>
        </div>
    )
}

export default MyGiftcon;