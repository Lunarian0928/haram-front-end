import { Link } from 'react-router-dom';
import './MainHeader.scss';

function MainHeader() {
    return (
        <header id="main-header">  
            <h1>하람</h1>
            <nav>
                <Link to="/">홈</Link>
                <Link to="/timer">타이머</Link>
            </nav>
            <div id="user-div">
                <Link to="/login">로그인</Link>
                <Link to="register">회원가입</Link>
            </div>
        </header>
    );
} 

export default MainHeader; 