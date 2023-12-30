import { useState } from 'react';   
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaKey } from "react-icons/fa";
import { IoMail  } from "react-icons/io5";

import axios from 'axios';
import UserInput from '../../components/commual/UserInput/UserInput';

import './FindPw.scss';

function FindPw() {    
    const location = useLocation();
    const { userIds } = location.state || {};
    const [id, setId] = useState(userIds || "");

    const [email, setEmail] = useState(""); // 이메일
    const [code, setCode] = useState(""); // 코드
    const [errs, setErrs] = useState({
        id: "",
        email: "",
        code: "",
        server: "",
    }); // 이메일 에러 메시지

    const [attempted, setAttempted] = useState(false); // 인증 시도
    const [authCode, setAuthCode] = useState("");

    const updateId = (e) => {
        const value = e.currentTarget.value;
        setId(value);
        setAttempted(false);

        if (!value) {
            setErrs(prevErrs => ({ ...prevErrs, id: '아이디를 입력하세요.' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, id: '' }));
        }
    }

    const updateEmail = (e) => {
        const value = e.currentTarget.value;
        setEmail(value);
        setAttempted(false);

        // 이메일 유효성 검사 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // 이메일 유효성을 검사하고 에러 메시지 설정
        if (!value) {
            setErrs(prevErrs => ({ ...prevErrs, email: '이메일을 입력하세요.' }));
        } else if (!emailRegex.test(value)) {
            setErrs(prevErrs => ({ ...prevErrs, email: '유효한 이메일을 입력하세요.' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, email: '' }));
        }
    }

    const updateCode = (e) => {
        const value = e.currentTarget.value;
        setCode(value);
    }

    const checkEmail = async () => {
        if ((id === "") || (email === "")) {
            if (errs.id === "") setErrs(prevErrs => ({ ...prevErrs, id: "아이디를 입력하세요" }));
            if (errs.email === "") setErrs(prevErrs => ({...prevErrs, email: "이메일을 입력하세요"}));
            return;
        }
        try {
            const response = await axios.post("/api/user/check_email", {
                userId: id,
                email: email
            });

            if (!response.data) {
                setErrs(prevErrs => ({ ...prevErrs, email: "등록된 이메일이 아닙니다" }));
                return false;
            } else {
                setErrs({ id: "", email: "", code: "", server: ""});
                return true;
            }
        } catch (error) {
            setErrs(prevErrs => ({ ...prevErrs, server: "서버 오류" }));
            return false;
        }
    }

    const sendEmail = async () => {
        const isEmailValid = await checkEmail();
        if (isEmailValid) {
            axios.post("/api/send_email/auth", {
                userId: id,
                email: email
            })
            .then((res) => {            
                setAttempted(true);
                if (res.data !== "") {
                    console.log(res.data);
                    setAuthCode(res.data);
                } else {
                    setAttempted(false);
                }
                
            })
            .catch((err) => {
                setErrs(prevErrs => ({ ...prevErrs, server: "서버 오류" }));
            })
        }
    }

    const navigate = useNavigate();
    const resetPassword = () => {
        if ((!attempted) || (code != authCode)) {
            if (!attempted) {
                setErrs(prevErrs => ({...prevErrs, code: "인증을 시도해야 합니다"}));
                return;
            }
            if (code != authCode) {
                setErrs(prevErrs => ({...prevErrs, code: "인증 코드가 일치하지 않습니다"}));
                return;
            }
        }
        navigate('/change_pw', { state: { userId: id } });
    }
    return (
        <div id="find-pw" className="glass">
            <h1>비밀번호 찾기</h1>
            <div className="input-group">
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
                        label="이메일"
                        value={email}
                        type="text"
                        placeholder="이메일"
                        onChange={updateEmail}
                        icon={<IoMail size="16" color="white" />}
                        onSendEmail={sendEmail} 
                    />
                </div>
                <p>{errs.id}</p>
                <p>{errs.email}</p>
                <p>{errs.server}</p>
            </div>
            <div className="input-group">
                <div className="input-div glass">
                    <UserInput
                        label="인증번호"
                        value={code}
                        type="text"
                        placeholder="인증번호"
                        onChange={updateCode}
                        icon={<FaKey size="16" color="white" />}
                    />
                </div>
            </div>
            <button className="glass" onClick={() => resetPassword()}>비밀번호 찾기</button>
            <p>{errs.code}</p>
        </div>
    );
}

export default FindPw; 
