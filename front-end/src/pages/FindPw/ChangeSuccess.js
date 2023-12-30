import { useState, useEffect } from 'react';   
import { useParams, Link, useNavigate } from 'react-router-dom';


function ResetSuccess() {
    const navigate = useNavigate();
    const login = () => {
        navigate("/login");
    }
    return (
        <div id="reset-success">
            <p>비밀번호 변경이 완료되었습니다</p>
            <button onClick={() => login()}>로그인하기</button>
        </div>
    );
}

export default ResetSuccess;    