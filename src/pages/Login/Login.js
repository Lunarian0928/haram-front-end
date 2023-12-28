import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInput from '../../components/commual/UserInput/UserInput';
import './Login.scss';

function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwVisible, setPwVisible] = useState(false);

    const handlePwToggle = () => {
        setPwVisible(!pwVisible);
    };

    return (
        <div id="login">
            <h1>로그인</h1>
            <div id="input">
            <UserInput 
                label="아이디"
                value={id}
                type="text"
                placeholder="아이디"
                onChange={setId}   
            />
            <UserInput 
                label="패스워드"
                value={pw}
                type={pwVisible ? 'password' : 'text'}
                placeholder="패스워드"
                onChange={setPw}
                onToggleVisibility={handlePwToggle}
            />
            </div>
            <button onClick={() => console.log("로그인 시도")}>로그인하기</button>
            <div id="links">
                <Link to="/find_id">아이디 찾기</Link>
                <Link to="/find_pw">비밀번호 찾기</Link>
                <Link to="/register">회원가입하기</Link>
            </div>
        </div>
    );
} 

export default Login; 