import { useState } from 'react';   
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";

import axios from 'axios';
import UserInput from '../../components/commual/UserInput/UserInput';

import './ChangePw.scss';

function ChangePw() {
    const location = useLocation();
    const { userId } = location.state || {};

    const [id, setId] = useState(userId || "");
    const [pw, setPw] = useState(""); // 패스워드
    const [pwConfirm, setPwConfirm] = useState("");
    const [pwVisible, setPwVisible] = useState(false);
    const [pwConfirmVisible, setPwConfirmVisible] = useState(false);
    const [errs, setErrs] = useState({
        pw: "",
        pwConfirm: "",
    })
    const updatePw = (e) => {
        const value = e.currentTarget.value;
        setPw(value);
    
        // 패스워드는 6자 이상이어야 함
        if (value.length < 6) {
            setErrs(prevErrs => ({ ...prevErrs, pw: '패스워드는 6자 이상이어야 합니다' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, pw: '' }));
        }
    }

    const updatePwConfirm = (e) => {
        const value = e.currentTarget.value;
        setPwConfirm(value);
    
        if (value !== pw) {
            setErrs(prevErrs => ({ ...prevErrs, pwConfirm: '입력한 패스워드와 다릅니다' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, pwConfirm: '' }));
        }
    }

    const handlePwToggle = () => {
        setPwVisible(!pwVisible);
    };

    const handlePwConfirmToggle = () => {
        setPwConfirmVisible(!pwConfirmVisible);
    };

    const navigate = useNavigate();
    const tryChangePw = () => {
        if (pw === "" || pwConfirm === "" || pw !== pwConfirm) {
            if (pw === "") setErrs(prevErrs => ({ ...prevErrs, pw: "비밀번호를 입력하세요" }));
            if (pwConfirm === "") setErrs(prevErrs => ({...prevErrs, pwConfirm: "비밀번호를 한 번 더 입력하세요" }));
            return;
        } 
            
        axios.post("/api/user/change_password", {
            userId: id,
            password: pw,   
        }).
        then((res) => {
            if (res.data) navigate("/change_success");
            else console.log("비밀번호 변경 실패");
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
    return (
        <div id="change-pw" className="glass">
            <h1>비밀번호 초기화</h1>
                <div className="input-group">
                    <div className="input-div glass">
                        <UserInput
                            label="패스워드"
                            value={pw}
                            type={!pwVisible ? 'password' : 'text'}
                            placeholder="패스워드"
                            onChange={updatePw}
                            onToggleVisibility={handlePwToggle}
                            icon={<FaLock size="16" color="white" />}
                        />
                        <UserInput
                            label="패스워드 확인"
                            value={pwConfirm}
                            type={!pwConfirmVisible ? 'password' : 'text'}
                            placeholder="패스워드 확인"
                            onChange={updatePwConfirm}
                            onToggleVisibility={handlePwConfirmToggle}
                            icon={<FaLock size="16" color="white" />}
                        />
                    </div>
                    <p>{errs.pw}</p>
                    <p>{errs.pwConfirm}</p>
            </div>
            <button className="glass" onClick={() => tryChangePw()}>비밀번호 변경</button>
                    
        </div>
    );
}

export default ChangePw;    