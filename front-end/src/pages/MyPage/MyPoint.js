import './MyPoint.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
function MyPoint() {
    const navigate = useNavigate();
    return (
        <div id="my-point" className="glass">
            <header>
                <h1>포인트</h1>
                <button onClick={() => navigate("/my_page")}><FaArrowLeft /></button>
            </header>
        </div>
    )
}

export default MyPoint;