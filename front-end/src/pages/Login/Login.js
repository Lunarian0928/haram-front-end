import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserInput from '../../components/commual/UserInput/UserInput';
import { FaUser, FaLock } from "react-icons/fa";
import './Login.scss';
import axios from 'axios';
function Login({login}) {
    const [id, setId] = useState("");
    const [, setIsIdDuplicate] = useState(false);
    const [pw, setPw] = useState("");
    const [pwVisible, setPwVisible] = useState(false);

    const [errs, setErrs] = useState({
        id: "",
        pw: "",
    }); 

    const updateId = (e) => {
        const value = e.currentTarget.value;
        setId(value);
        setIsIdDuplicate(false);
    
        // 아이디는 4자 이상이어야 하고 영문 대소문자와 숫자만 허용
        if (value.length < 4 || !/^[a-zA-Z0-9]+$/.test(value)) {
            setErrs(prevErrs => ({ ...prevErrs, id: '아이디는 4자 이상이어야 하고 영문 대소문자와 숫자만 허용됩니다.' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, id: '' }));
        }
    }
    
    const updatePassword = (e) => {
        const value = e.currentTarget.value;
        setPw(value);
    
        // 패스워드는 6자 이상이어야 함
        if (value.length < 6) {
            setErrs(prevErrs => ({ ...prevErrs, pw: '패스워드는 6자 이상이어야 합니다.' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, pw: '' }));
        }
    }

    const handlePwToggle = () => {
        setPwVisible(!pwVisible);
    };

    const navigate = useNavigate();
    const tryLogin = () => {
        axios.post("/api/login", {
            userId: id,
            password: pw,            
        })
        .then((res) => { 
            if (res.data) {
                login(id);
                navigate("/");
            }
            else {

            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div id="login" className="glass">
            <h1>로그인</h1>
            <div id="input-group">
                <div className="input-div glass">
                    <UserInput
                        label="아이디"
                        value={id}
                        type="text"
                        placeholder="아이디"
                        onChange={updateId}
                        icon={<FaUser size="16" color="white" />}
                    />
                    <UserInput
                        label="패스워드"
                        value={pw}
                        type={!pwVisible ? 'password' : 'text'}
                        placeholder="패스워드"
                        onChange={updatePassword}
                        onToggleVisibility={handlePwToggle}
                        icon={<FaLock size="16" color="white" />}
                    />
                </div>
                <p>{errs.id}</p>
                <p>{errs.pw}</p>
            </div>
            <button className="glass" onClick={() => tryLogin()}>로그인하기</button>
            <div id="links">
                <Link to="/find_id">아이디 찾기</Link>
                <Link to="/find_pw">비밀번호 찾기</Link>
                <Link to="/register">회원가입하기</Link>
            </div>
        </div>
    );
} 

export default Login; 