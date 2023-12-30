import './FindId.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import UserInput from '../../components/commual/UserInput/UserInput';

function FindId() {
    const [name, setName] = useState("");
    const [foundUserIds, setFoundUserIds] = useState([]);
    const [attempted, setAttempted] = useState(false);
    const [selectableUserIds, setSelectableUserIds] = useState([]);
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const updateName = (e) => {
        const value = e.currentTarget.value;
        setName(value);
        setFoundUserIds([]);
        setAttempted(false);
    }

    const tryFindId = () => {
        axios.get(`/api/user/find/name=${name}`)
        .then((res) => {
            setFoundUserIds(res.data);
            setAttempted(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const toggleCheckbox = (userId) => {
        const isChecked = selectableUserIds.includes(userId);
        if (isChecked) {
            setSelectableUserIds(selectableUserIds.filter(id => id !== userId));
        } else {
            setSelectableUserIds([...selectableUserIds, userId]);
        }
    };

    return (
        <div id="find-id" className="glass"> 
            <h1>아이디 찾기</h1>
            <div id="input-group">
                <div className="input-div glass">
                    <UserInput 
                        label="이름"
                        value={name}
                        type="text"
                        placeholder="이름"
                        onChange={updateName}
                        icon={<FaUser size="16" color="white" />}
                    />
                </div>
            </div>
            {
                attempted ? 
                    <div id="find-result">
                        {
                            (foundUserIds.length > 0) ? 
                            <p>
                                입력하신 정보로 가입된 아이디는 총 {foundUserIds.length}개 있습니다
                            </p>
                            :
                            <p>
                                입력하신 정보로 가입된 아이디가 없습니다
                            </p>
                        }
                        <div id="id-list">
                        {foundUserIds.map((userId, index) => (
                                <label key={index}>
                                <input type="checkbox" name={userId} value={userId} onChange={() => toggleCheckbox(userId)}/>
                                {userId}
                            </label>
                        ))}
                        </div>
                    </div>: <></> 
            }
            <button className="glass" onClick={() => tryFindId()}>아이디 찾기</button>
            <div id="links">
                <Link to={`/find_pw`} state={{ userIds: selectableUserIds }}>비밀번호 찾기</Link>
                <Link to="/login">로그인하기</Link>
            </div>
        </div>
    );
}

export default FindId;
