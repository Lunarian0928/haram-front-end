import { useState } from 'react';
import UserInput from '../../components/commual/UserInput/UserInput';

function Register() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwVisible, setPwVisible] = useState(false);
    const [birthDate, setBirthDate] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const handlePwToggle = () => {
        setPwVisible(!pwVisible);
    };

    return (
        <div id="register">
            <h1>회원가입</h1>
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
                <UserInput 
                    label="이름"
                    value={name}
                    type="text"
                    placeholder="이름"
                    onChange={setName}   
                />
                <UserInput 
                    label="생년월일"
                    value={birthDate}
                    type="text"
                    placeholder="생년월일 8자리"
                    onChange={setBirthDate}   
                />
                <UserInput 
                    label="전화번호"
                    value={phoneNum}
                    type="text"
                    placeholder="전화번호"
                    onChange={setPhoneNum}   
                />
                <button onClick={() => console.log("회원가입 시도")}>회원가입하기</button>
            </div>
        </div>
    );
} 

export default Register; 