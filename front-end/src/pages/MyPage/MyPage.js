import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaCoins } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import axios from 'axios';

import './MyPage.scss';
function MyPage({id}) {
    const [name, setName] = useState("");
    useEffect(() => {
        axios.get(`/api/user/get_name/user_id=${id}`)
        .then((res) => {
            console.log(res);
            setName(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id]);

    const navigate = useNavigate();
    return (
        <div id="my-page" className="glass">
            <h1>마이페이지</h1>
            <div id="profile-div" className="glass">
                <div id="profile-img" className="glass">
                    <img src="" />
                </div>
                <div id="id-info">
                    <div>
                        <p><span>{name}</span> 님 환영합니다</p>
                        <button></button>
                    </div>
                    <p>{id}</p>
                </div>
            </div>
            <div id="storage-div" className="glass">
                <div className="storage-button glass" onClick={() => navigate("./my_point")}> 
                    <FaCoins size="60" color="white"/>
                    <div>
                        <h2>포인트</h2>
                        <p>500</p>
                    </div>
                </div>
                <div className="storage-button glass" onClick={() => navigate("./my_giftcon")}>
                    <FaTicketAlt size="60" color="white"/>
                    <div>
                        <h2>기프트콘 보관함</h2>
                        <p>5개</p>
                    </div>
                </div>
                <div className="storage-button glass">
                    <MdCurrencyExchange size="60" color="white"/>
                    <div>
                        <h2>포인트 적립캐시 교환</h2>
                        <p>포인트 적립캐시 교환</p>
                    </div>
                </div>
            </div>
            <div id="관심친구">
            </div>
            <div id="links">
            </div>
        </div>
    )
}
export default MyPage;