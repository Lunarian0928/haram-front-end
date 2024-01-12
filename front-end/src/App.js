import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialDuration, setDuration, setIsRunning, setReminderEls } from './redux/actions';
import ReactAudioPlayer from 'react-audio-player';

import axios from 'axios';
import MainHeader from './components/commual/MainHeader/MainHeader'; // 메인 헤더
import SideBar from './components/commual/SideBar/SideBar'; // 사이드 바
import Home from './pages/Home/Home'; // 홈 페이지
// 알람
import Reminder from './pages/Reminder/Reminder'; // 알람 페이지
import ModifyReminder from './pages/Reminder/ModifyReminder'; // 알람 수정 페이지
import AddReminder from './pages/Reminder/AddReminder'; // 알람 추가 페이지
import ReminderAlarmModal from './alarmModals/ReminderAlarmModal';
// 타이머
import Timer from './pages/Timer/Timer'; // 타이머 페이지
// 시계
import Clock from './pages/Clock/Clock'; // 시계 페이지
// 회원가입/로그인
import Login from './pages/Login/Login'; // 로그인 페이지
import Register from './pages/Register/Register'; // 회원가입 페이지
import Welcome from './pages/Register/Welcome';
import FindId from './pages/FindId/FindId'; // 아이디 찾기 페이지
import FindPw from './pages/FindPw/FindPw';
import ChangePw from './pages/FindPw/ChangePw'; // 패스워드 초기화 페이지
import ChangeSuccess from './pages/FindPw/ChangeSuccess'; // 패스워드 초기화 완료 페이지
// 마이페이지
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
  
  const [reminderAlarmDates, setReminderAlarmDates] = useState([]);
  const reminderEls = useSelector((state) => state.reminder.reminderEls);
  const [reminderAlarmModalIsOpen, setReminderAlarmModalIsOpen] = useState(false);
  const [endedReminderId, setEndedReminderId] = useState(0);
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
    if (storedDuration && !(storedDuration.hr === 0 && storedDuration.min === 0 && storedDuration.sec === 0)) {
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
    } else {
      localStorage.setItem('isRunning', 'false'); 
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

  useEffect(() => {
    axios.get("/api/reminder/read")
    .then((res) => {
        res.data.forEach(item => {
            item.isActive = item.active;
            item.isRepeating = item.repeating;
            delete item.active;
            delete item.repeating;
        });
        dispatch(setReminderEls(res.data));
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  const dayToNumber = {
    "일": 0,
    "월": 1,
    "화": 2,
    "수": 3,
    "목": 4,
    "금": 5,
    "토": 6,
  };
  
  useEffect(() => {
    if (!Array.isArray(reminderEls)) return; // reminderEls를 아직 읽어오지 않은 경우
    const updatedReminderAlarmDates = [];

    reminderEls.forEach((reminderElement) => {
      if (!reminderElement.isActive) return; // 알람을 꺼놓은 경우
      var reminderHour = reminderElement.timeHour;
      if (reminderElement.timeMeridiem === '오후') reminderHour += 12;
      var reminderMin = reminderElement.timeMin;

      // case 1: 요일을 선택 안하고 특정 날짜를 선택한 경우
      if (reminderElement.days.length === 0) {
        const reminderAlarmDate = new Date();
        reminderAlarmDate.setFullYear(reminderElement.specialDayYear);
        reminderAlarmDate.setMonth(reminderElement.specialDayMonth - 1);
        reminderAlarmDate.setDate(reminderElement.specialDayDate);

        // 공휴일에는 끄는 옵션을 설정하였다면
        // 날짜 계산 후 공휴일 여부 판정
        if (reminderElement.holidayOption && checkHoliday(
          reminderAlarmDate.getFullYear(),
          reminderAlarmDate.getMonth(),
          reminderAlarmDate.getDate()
        )) return;

        // 알람이 울리는 시간 설정
        reminderAlarmDate.setHours(reminderHour);
        reminderAlarmDate.setMinutes(reminderMin);
        reminderAlarmDate.setSeconds(0);

        updatedReminderAlarmDates.push({
          id: reminderElement.id,
          date: reminderAlarmDate
        });
      } else {
        // case 2: 요일을 선택한 경우
        const selectedDays = reminderElement.days.map((day) => dayToNumber[day]);

        selectedDays.forEach((selectedDay) => {
          const reminderAlarmDate = new Date();

          // selectedDay에 해당하는 다음 알람 시간 계산
          let daysToAdd = selectedDay - reminderAlarmDate.getDay();
          if (daysToAdd < 0) {
            daysToAdd += 7; // 선택한 요일이 현재 요일보다 이전이면 다음 주로 이동
          } else if (daysToAdd === 0 && reminderAlarmDate < new Date()) {
            daysToAdd += 7; // 선택한 요일이 현재 요일이며, 현재 시간보다 이전인 경우 다음 주로 이동
          }

          const nextDateTimestamp = reminderAlarmDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000;
          reminderAlarmDate.setTime(nextDateTimestamp);

          // 공휴일에는 끄는 옵션을 설정하였다면
          // 날짜 계산 후 공휴일 여부 판정
          if (reminderElement.holidayOption && checkHoliday(
            reminderAlarmDate.getFullYear(),
            reminderAlarmDate.getMonth(),
            reminderAlarmDate.getDate()
          )) return;

          // 알람이 울리는 시간 재설정
          reminderAlarmDate.setHours(reminderHour);
          reminderAlarmDate.setMinutes(reminderMin);
          reminderAlarmDate.setSeconds(0);

          updatedReminderAlarmDates.push({
            id: reminderElement.id,
            date: reminderAlarmDate,
          });
          updatedReminderAlarmDates.sort((a, b) => a.date - b.date);
        });
      }
    });
    setReminderAlarmDates(updatedReminderAlarmDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminderEls]);
  
  useEffect(() => {
    const timeoutIds = [];
  
    reminderAlarmDates.forEach(reminderAlarmDate => {
      const now = new Date();
      const timeUntilAlarm = reminderAlarmDate.date - now;
      
      if (timeUntilAlarm > 0) {
        const timeoutId = setTimeout(() => {
          console.log(`Alarm ${reminderAlarmDate.id} triggered at ${new Date()}`);
          setEndedReminderId(reminderAlarmDate.id);
          console.log("Adding timeoutId:", timeoutId);
        }, timeUntilAlarm);
  
        timeoutIds.push(timeoutId);
      }
    });
  
    // Cleanup function
    return () => {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, [reminderAlarmDates, reminderEls]);

  const checkHoliday = (year, month, date) => {
    console.log(`/api/check_holiday?year=${year}&month=${month}&date=${date}`);
    return axios.get(`/api/check_holiday?year=${year}&month=${month}&date=${date}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
  }
  // 알람 끄기 모달창을 여는 함수
  useEffect(() => {
    if (endedReminderId !== 0) reminderAlarmModalOpen();
  }, [endedReminderId]) 

  const reminderAlarmModalClose = () => {
    setReminderAlarmModalIsOpen(false);
  }

  const reminderAlarmModalOpen = () => {
    setReminderAlarmModalIsOpen(true);
  }

  const handleKeyDown = (event) => {
    // Tab 키 코드: 9
    if (event.keyCode === 9) {
      reminderAlarmModalOpen();
    }
  };
  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex="0">
      <BrowserRouter>
        <MainHeader isLoggedIn={isLoggedIn} loggedInId={loggedInId} logout={logout} />
        <SideBar />
        <ReactAudioPlayer
          ref={audioRef}
          src={`${process.env.PUBLIC_URL}/audio/scene_change5.mp3`}
          autoPlay={false}
          controls={false}
        />
        <ReminderAlarmModal modalIsOpen={reminderAlarmModalIsOpen} closeModal={reminderAlarmModalClose} endedReminderId={endedReminderId} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminder" element={<Reminder />} /> {/* 알람 페이지 */}
          <Route path="/add_reminder" element={<AddReminder />} /> {/* 알람 추가 페이지 */}
          <Route path="/modify_reminder" element={<ModifyReminder />} /> {/* 알람 수정 페이지 */}
          <Route path="/clock" element={<Clock /> } /> {/* 시계 페이지 */}
          <Route path="/timer" element={<Timer />} /> {/* 타이머 페이지 */}
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
