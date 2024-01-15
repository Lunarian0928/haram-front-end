import { Link, useNavigate } from 'react-router-dom';
import './MainHeader.scss';

function MainHeader({isLoggedIn, loggedInId, logout}) {
    const navigate = useNavigate();
    return (
        <header id="main-header">  
            <h1>Haram</h1>
            <div id="user-div">
                {
                    isLoggedIn ? 
                    <>
                        <Link to="/my_page">{loggedInId}</Link>
                        <button 
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                        >
                            로그아웃
                        </button>
                    </> : 
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="register">회원가입</Link>
                    </>
                }
            </div>
        </header>
    );
} 

export default MainHeader; 