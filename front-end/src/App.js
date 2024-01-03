import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialDuration, setDuration, setIsRunning } from './redux/actions';
import ReactAudioPlayer from 'react-audio-player';

import MainHeader from './components/commual/MainHeader/MainHeader'; // 메인 헤더
import SideBar from './components/commual/SideBar/SideBar'; // 사이드 바
import Home from './pages/Home/Home'; // 홈 페이지
import Timer from './pages/Timer/Timer'; // 타이머 페이지
import Clock from './pages/Clock/Clock'; // 시계 페이지
import Login from './pages/Login/Login'; // 로그인 페이지
import Register from './pages/Register/Register'; // 회원가입 페이지
import Welcome from './pages/Register/Welcome';
import FindId from './pages/FindId/FindId'; // 아이디 찾기 페이지
import FindPw from './pages/FindPw/FindPw';
import ChangePw from './pages/FindPw/ChangePw'; // 패스워드 초기화 페이지
import ChangeSuccess from './pages/FindPw/ChangeSuccess'; // 패스워드 초기화 완료 페이지
import MyPage from './pages/MyPage/MyPage';
import MyPoint from './pages/MyPage/MyPoint';
import MyGiftcon from './pages/MyPage/MyGiftcon';

function App() {
  const dispatch = useDispatch();
  const { initialDuration, duration, isRunning } = useSelector((state) => state.timer);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");

  const audioRef = useRef(null);
  const [timerEnded, setTimerEnded] = useState(false);
  
  // 자명종 알람 반복 횟수
  // const [reminderAlarmRepeatCount, setReminderAlarmRepeatCount] = useState(0);
  // 타이머 알람 반복 횟수
  const [, setTimerAlarmRepeatCount] = useState(0);
  
  const login = (id) => {
    setLoggedInId(id);
    setIsLoggedIn(true);

    // 로그인 시 로컬 스토리지에 로그인 상태와 아이디를 저장
    localStorage.setItem('loggedInId', id);
    localStorage.setItem('isLoggedIn', true);
  }

  const logout = () => {
    setLoggedInId("");
    setIsLoggedIn(false);

    // 로그아웃 시 로컬 스토리지의 로그인 상태와 아이디를 초기화
    localStorage.setItem('loggedInId', "");
    localStorage.setItem('isLoggedIn', false);
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 로그인 상태와 아이디를 가져와서 적용
    const storedLoggedInId = localStorage.getItem('loggedInId');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedLoggedInId && storedIsLoggedIn === "true") {
      setLoggedInId(storedLoggedInId);
      setIsLoggedIn(true);
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함


  useEffect(() => {
    // 타이머 시작 여부를 localStorage로 불러오기
    const storedIsRunning = localStorage.getItem('isRunning') === 'true'; 
    dispatch(setIsRunning(storedIsRunning)); // 타이머 시작 여부를 state로 저장하기
    
    const storedDuration = JSON.parse(localStorage.getItem('duration'));
    if (storedDuration && (storedDuration.hr !== 0 && storedDuration.min !== 0 && storedDuration.sec !== 0)) {
      dispatch(setDuration(storedDuration)); // 지금 타이머 시간으로 초기화
    } else {
      const storedInitialDuration = JSON.parse(localStorage.getItem('initialDuration'));
      if (storedInitialDuration) {
        dispatch(setInitialDuration(storedInitialDuration));
        dispatch(setDuration(storedInitialDuration));
      }
      else {
        dispatch(setDuration(initialDuration));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  
  // 타이머 재생
  useEffect(() => { 
    let interval;
    if (isRunning) {
      //  타이머 시작 여부를 localStorage에 저장하기
      localStorage.setItem('isRunning', 'true'); 
      interval = setInterval(() => {
        const nextDuration = calculateNextDuration(duration);
        dispatch(setDuration(nextDuration));
        //  타이머 시간을 localStorage에 저장하기
        localStorage.setItem('duration', JSON.stringify(nextDuration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, isRunning, duration]);
  
  const calculateNextDuration = (prevDuration) => {
    if (prevDuration.hr === 0 && prevDuration.min === 0 && prevDuration.sec === 0) {
      setTimerEnded(true);
      return prevDuration;
    }
    if (prevDuration.sec === 0) {
      if (prevDuration.min === 0) {
        return {
          hr: prevDuration.hr - 1,
          min: 59,
          sec: 59,
        };
      }
      return {
        hr: prevDuration.hr,
        min: prevDuration.min - 1,
        sec: 59,
      };
    }
    return {
      hr: prevDuration.hr,
      min: prevDuration.min,
      sec: prevDuration.sec - 1,
    };
  };

  useEffect(() => {
    const playAlarm = () => {
      const audioElement = audioRef.current.audioEl.current;
      const handleAudioEnd = () => {
        audioElement.removeEventListener('ended', handleAudioEnd);
  
        setTimerAlarmRepeatCount((prevCnt) => {
          if (prevCnt < 2) {
            audioElement.currentTime = 0;
            audioElement.play();
            audioElement.addEventListener('ended', handleAudioEnd);
          } else {
            setTimerEnded(false);
          }
          return prevCnt + 1;
        });
      };
  
      audioElement.addEventListener('ended', handleAudioEnd);
      audioElement.play();
    };
  
    if (timerEnded) {
      dispatch(setIsRunning(false));
      localStorage.setItem('isRunning', 'false');
  
      setTimerAlarmRepeatCount(0);
      playAlarm();
    }
  }, [dispatch, timerEnded]);
  

  return (
    <div className="App">
      <BrowserRouter>
        <MainHeader isLoggedIn={isLoggedIn} loggedInId={loggedInId} logout={logout} />
        <SideBar />
        <ReactAudioPlayer
          ref={audioRef}
          src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`}
          autoPlay={false}
          controls={false}
        />
        <Routes>
          <Route path="/" element={<Home />} /> {/* 홈 페이지 */}
          <Route path="/clock" element={<Clock /> } /> {/* 시계 페이지 */}
          <Route path="/timer/*" element={<Timer />} /> {/* 타이머 페이지 */}
          <Route path="/login" element={<Login login={login} />} /> {/* 로그인 페이지 */}
          <Route path="/register" element={<Register />} /> {/* 회원가입 페이지 */}
          <Route path="/welcome" element={<Welcome />  } /> {/*회원가입 성공 안내 페이지 */}
          <Route path="/find_id" element={<FindId />} /> {/* 아이디 찾기 페이지 */}
          <Route path="/find_pw" element={<FindPw />} />
          <Route path="/change_pw" element={<ChangePw />} />
          <Route path="/change_success" element={<ChangeSuccess />} />
          <Route path="my_page" element={<MyPage id={loggedInId} />} />
          <Route path="my_page/my_point" element={<MyPoint/> } />
          <Route path="my_page/my_giftcon" element={<MyGiftcon /> } />
          <Route path="*" element={<Navigate replace to="/" />} /> {/* 리다이렉트 페이지 */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
