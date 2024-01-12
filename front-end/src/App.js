import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setReminderEls } from './redux/actions';

import axios from 'axios';
import MainHeader from './components/commual/MainHeader/MainHeader'; // 메인 헤더
import SideBar from './components/commual/SideBar/SideBar'; // 사이드 바
import Home from './pages/Home/Home'; // 홈 페이지
// 알람
import Reminder from './pages/Reminder/Reminder'; // 알람 페이지
import ModifyReminder from './pages/Reminder/ModifyReminder'; // 알람 수정 페이지
import AddReminder from './pages/Reminder/AddReminder'; // 알람 추가 페이지
import ReminderAlarmModal from './alarmModals/ReminderAlarmModal'; // 자명종 알람 모달
// 타이머
import Timer from './pages/Timer/Timer'; // 타이머 페이지
import TimerAlarmModal from './alarmModals/TimerAlarmModal'; // 타이머 알람 모달
// 스톱워치
import Stopwatch from './pages/Stopwatch/Stopwatch'; // 스톱워치 페이지
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");

  const [reminderAlarmModalIsOpen, setReminderAlarmModalIsOpen] = useState(false);
  
  const [reminderAlarmDates, setReminderAlarmDates] = useState([]);
  const reminderEls = useSelector((state) => state.reminder.reminderEls);
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
        <TimerAlarmModal/>
        <ReminderAlarmModal modalIsOpen={reminderAlarmModalIsOpen} closeModal={reminderAlarmModalClose} endedReminderId={endedReminderId} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminder" element={<Reminder />} /> {/* 알람 페이지 */}
          <Route path="/add_reminder" element={<AddReminder />} /> {/* 알람 추가 페이지 */}
          <Route path="/modify_reminder" element={<ModifyReminder />} /> {/* 알람 수정 페이지 */}
          <Route path="/clock" element={<Clock /> } /> {/* 시계 페이지 */}
          <Route path="/timer" element={<Timer />} /> {/* 타이머 페이지 */}
          <Route path="/stopwatch" element={<Stopwatch />} />
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
