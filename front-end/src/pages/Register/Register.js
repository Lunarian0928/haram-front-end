import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../components/commual/UserInput/UserInput';
import axios from 'axios';
import { FaUser, FaLock, FaBirthdayCake } from "react-icons/fa";
import { IoMail, IoPhonePortraitOutline } from "react-icons/io5";
import './Register.scss';

function Register() {
    // 상태값 초기화
    const [formData, setFormData] = useState({
        id: "",
        isIdDuplicate: false,
        checkedIdDuplicate: false,
        pw: "",
        pwVisible: false,
        email: "",
        name: "",
        birthDate: "",
        phoneNum: "",
    });

    const [errs, setErrs] = useState({
        id: "",
        pw: "",
        email: "",
        name: "",
        birthDate: "",
        phoneNum: "",
        server: "", 
    });

  // 입력값 업데이트 함수
    const updateField = (value, field, validationRegex, errorMessage) => {
        if (!value || (validationRegex && !validationRegex.test(value))) {
            setErrs(prevErrs => ({ ...prevErrs, [field]: errorMessage }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, [field]: "" }));
    }
        setFormData(prevData => ({ ...prevData, [field]: value }));
    };

    // 각 입력값 업데이트 함수들
    const updateId = (e) => {
        const value = e.currentTarget.value;
        setFormData(prevData => ({ ...prevData, isIdDuplicate: false, checkedIdDuplicate: false }));
        updateField(value, 'id', /^[a-zA-Z0-9]+$/, '아이디는 4자 이상이어야 하고 영문 대소문자와 숫자만 허용됩니다.');
    };

    const checkIdDuplicateTest = () => {
        if (!formData.checkedIdDuplicate) {
            setErrs(prevErrs => ({ ...prevErrs, id: '중복체크를 해야 합니다' }));
        } else {
            setErrs(prevErrs => ({ ...prevErrs, id: '' }));
        }
    };

    const updatePassword = (e) => {
        const value = e.currentTarget.value;
        updateField(value, 'pw', undefined, '패스워드는 6자 이상이어야 합니다.');
    };

    const updateEmail = (e) => {
        const value = e.currentTarget.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        updateField(value, 'email', emailRegex, '유효한 이메일을 입력하세요.');
    };

    const updateName = (e) => {
        const value = e.currentTarget.value;
        updateField(value, 'name', undefined, '이름은 2자 이상이어야 합니다.');
    };

    const updateBirthDate = (e) => {
        const value = e.currentTarget.value;
        updateField(value, 'birthDate', /^\d{8}$/, '생년월일은 8자리 숫자여야 합니다.');
    };

    const updatePhoneNum = (e) => {
        const value = e.currentTarget.value;
        updateField(value, 'phoneNum', /^\d+$/, '전화번호는 숫자로만 이루어져야 합니다.');
    };

    const handlePwToggle = () => {
        setFormData(prevData => ({ ...prevData, pwVisible: !prevData.pwVisible }));
    };

    // 아이디 중복 체크
    const checkDuplicate = () => {
        axios.get(`/api/register/check_duplicate/${formData.id}`)
        .then((res) => {
            console.log(res.data);
            setFormData(prevData => ({ ...prevData, checkedIdDuplicate: true, isIdDuplicate: res.data }));

            if (res.data) {
            setErrs(prevErrs => ({ ...prevErrs, id: '사용할 수 없는 아이디입니다' }));
            } else {
            setErrs(prevErrs => ({ ...prevErrs, id: '' }));
            }
        })
        .catch((err) => {
            console.log(err);
            setFormData(prevData => ({ ...prevData, checkedIdDuplicate: true, isIdDuplicate: true }));
        });
    };

    // React Router의 hook을 사용하여 페이지 이동
    const navigate = useNavigate();

    // 회원가입 시도
    const tryRegistration = () => {
        if (Object.values(errs).some(error => error !== "")) {
            console.log("입력 정보를 다시 확인하세요.");
            return;
        }

        const { id, pw, email, name, birthDate, phoneNum } = formData;
        if (id && pw && name && birthDate && phoneNum) {
            axios.post('/api/register/try_registration', {
                userId: id,
                password: pw,
                email: email,
                name: name,
                birthDate: birthDate,
                phoneNum: phoneNum
            })
            .then((res) => {
                if (res.data || true) {
                    navigate(`/welcome`, {
                    state: {
                        name: name
                    }});
            }})
            .catch((err) => {
                console.log(err);
                setErrs(prevErrs => ({ ...prevErrs, server: "서버 에러가 발생했습니다." }));
            });
        } else {
            console.log("모든 필드를 입력하세요");
        }
    };

    return (
        <div id="register" className="glass">
            <h1>회원가입</h1>
            <div id="input-group">
                <div className="input-div glass">
                    {/* 아이디 입력 */}
                    <UserInput
                        value={formData.id}
                        type="text"
                        placeholder="아이디"
                        onChange={updateId}
                        icon={<FaUser size="16" color="white" />}
                        onCheckDuplicate={checkDuplicate}
                        onBlur={checkIdDuplicateTest}
                        noDuplicate={!formData.isIdDuplicate && formData.checkedIdDuplicate}
                    />
                    {/* 패스워드 입력 */}
                    <UserInput
                        value={formData.pw}
                        type={!formData.pwVisible ? 'password' : 'text'}
                        placeholder="패스워드"
                        onChange={updatePassword}
                        icon={<FaLock size="16" color="white" />}
                        onToggleVisibility={handlePwToggle}
                    />
                    {/* 이메일 입력 */}
                    <UserInput
                        value={formData.email}
                        type="text"
                        placeholder="이메일"
                        onChange={updateEmail}
                        icon={<IoMail size="16" color="white" />}
                    />
                </div>
                {/* 서버 에러 메시지 출력 */}
                <p>{errs.server}</p>
                {/* 각 입력 필드에 대한 에러 메시지 출력 */}
                {Object.keys(errs)
                    .filter(key => ['id', 'pw', 'email'].includes(key))
                    .map(key => <p key={key}>{errs[key]}</p>)
                }
            </div>
            <div id="input-group">
                <div className="input-div glass">
                    {/* 이름 입력 */}
                    <UserInput
                        value={formData.name}
                        type="text"
                        placeholder="이름"
                        onChange={updateName}
                        icon={<FaUser size="16" color="white" />}
                    />
                    {/* 생년월일 입력 */}
                    <UserInput
                        value={formData.birthDate}
                        type="text"
                        placeholder="생년월일 8자리"
                        onChange={updateBirthDate}
                        icon={<FaBirthdayCake size="16" color="white" />}
                    />
                    {/* 전화번호 입력 */}
                    <UserInput
                        label="전화번호"
                        value={formData.phoneNum}
                        type="text"
                        placeholder="전화번호"
                        onChange={updatePhoneNum}
                        icon={<IoPhonePortraitOutline size="16" color="white" />}
                    />
                </div>
                {/* 각 입력 필드에 대한 에러 메시지 출력 */}
                {
                    Object.keys(errs)
                    .filter(key => ['name', 'birthDate', 'phoneNum'].includes(key))
                    .map(key => <p key={key}>{errs[key]}</p>)
                }
            </div>
            {/* 회원가입 버튼 */}
            <button className="glass" onClick={tryRegistration}>회원가입하기</button>
        </div>
    );
}

export default Register;
