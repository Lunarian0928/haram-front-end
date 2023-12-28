import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainHeader from './components/commual/MainHeader/MainHeader'; // 메인 헤더
import Home from './pages/Home/Home'; // 홈 페이지
import Timer from './pages/Timer/Timer'; // 타이머 페이지
import Login from './pages/Login/Login'; // 로그인 페이지
import Register from './pages/Register/Register'; // 회원가입 페이지
import FindId from './pages/FindId/FindId'; // 아이디 찾기 페이지
import FindPw from './pages/FindPw/FindPw'; // 패스워드 찾기 페이지

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />} /> {/* 홈 페이지 */}
          <Route path="/timer/*" element={<Timer />} /> {/* 타이머 페이지 */}
          <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
          <Route path="/register" element={<Register />} /> {/* 회원가입 페이지 */}
          <Route path="/find_id" element={<FindId />} /> {/* 아이디 찾기 페이지 */}
          <Route path="/find_pw" element={<FindPw />} /> {/* 패스워드 찾기 페이지 */}
          <Route path="*" element={<Navigate replace to="/" />} /> {/* 리다이렉트 페이지 */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
