import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Welcome.scss';

function Welcome() {
    const location = useLocation();
    const { name } = location.state || {};

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/user/exist/name=${name}`)
            .then((res) => {
                if (!res.data) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);
                navigate("/");
            });
    }, [name]); 

    return (
        <div id="welcome" className="glass">
            <h1>회원가입이 완료되었습니다</h1>
            <p>{name} 님 회원가입을 축하합니다.</p>
            <button className="glass" onClick={() => navigate("/login")}>로그인하기</button>
        </div>
    );
}

export default Welcome;
