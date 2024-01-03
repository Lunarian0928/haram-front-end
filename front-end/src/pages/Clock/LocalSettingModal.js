import './LocalSettingModal.scss';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";

function LocalSettingModal({modalIsOpen, closeModal, country, timeZone, handleTimeZone}) {
    const countries = [
        '미국', 
        '캐나다', 
        '영국', 
        '독일', 
        '프랑스', 
        '덴마크', 
        '이탈리아', 
        '스페인', 
        '스웨덴', 
        '포르투갈', 
        '러시아', 
        '핀란드', 
        '그리스', 
        '터키', 
        '우크라이나', 
        '폴란드', 
        '이스라엘', 
        '일본', 
        '대한민국', 
        '중국', 
        '홍콩',
        '마카오', 
        '대만', 
        '인도', 
        '브라질', 
        '멕시코', 
        '아르헨티나'
    ];
    const countryOptions = countries.map((country, index) => (
        <option key={index} value={country}>
        {country}
        </option>
    ))
    const [cityOptions, setCityOptions] = useState([]);

    const [timeZones, setTimeZones] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(country);
    const [selectedTimeZone, setSelectedTimeZone] = useState(timeZone);

    useEffect(() => {
        switch (selectedCountry) {
            case '미국':
                setTimeZones([
                    {city: '뉴욕', value: 'America/New_York'}, 
                    {city: '시카고', value: 'America/Chicago'}, 
                    {city: '덴버', value: 'America/Denver'}, 
                    {city: '피닉스', value: 'America/Phoenix'}, 
                    {city: '앵커리지', value: 'America/Anchorage'}, 
                    {city: '아닥', value: 'America/Adak'}, 
                    {city: '하와이', value: 'America/Honolulu'}
                ]);
                break;
            case '캐나다':
                setTimeZones([
                    {city: '토론토', value: 'America/Toronto'}
                ]);
                break;
            case '영국':
                setTimeZones([
                    {city: '런던', value: 'Europe/London'}
                ]);
                break;
            case '독일':
                setTimeZones([
                    {city: '베를린', value: 'Europe/Berlin'}
                ]);
                break;
            case '프랑스':
                setTimeZones([
                    {city: '파리', value: 'Europe/Paris'}
                ]);
                break;
            case '덴마크':
                setTimeZones([
                    {city: '코펜하겐', value: 'Europe/Copenhagen'}
                ]);
                break;
            case '이탈리아':
                setTimeZones([
                    {city: '로마', value: 'Europe/Rome'}
                ]);
                break;
            case '스페인':
                setTimeZones([
                    {city: '마드리드', value: 'Europe/Madrid'}
                ]);
                break;
            case '스웨덴':
                setTimeZones([
                    {city: '스톡홀름', value: 'Europe/Stockholm'}
                ]);
                break;
            case '포르투갈':
                setTimeZones([
                    {city: '리스본', value: 'Europe/Lisbon'}
                ]);
                break;
            case '러시아':
                setTimeZones([
                    {city: '모스크바', value: 'Europe/Moscow'}
                ]);
                break;
            case '핀란드':
                setTimeZones([
                    {city: '헬싱키', value: 'Europe/Helsinki'}
                ]);
                break;
            case '그리스':
                setTimeZones([
                    {city: '아테네', value: 'Europe/Athens'}
                ]);
                break;
            case '터키':
                setTimeZones([
                    {city: '이스탄불', value: 'Europe/Istanbul'}
                ]);
                break;
            case '우크라이나':
                setTimeZones([
                    {city: '키예프', value: 'Europe/Kiev'}
                ]);
                break;
            case '폴란드':
                setTimeZones([
                    {city: '바르샤바', value: 'Europe/Warsaw'}
                ]);
                break;
            case '이스라엘':
                setTimeZones([
                    {city: '예루살렘', value: 'Asia/Jerusalem'}
                ]);
                break;
            case '일본':
                setTimeZones([
                    {city: '도쿄', value: 'Asia/Tokyo'}
                ]);
                break;
            case '대한민국':
                setTimeZones([
                    {city: '서울', value: 'Asia/Seoul'}
                ]);
                break;
            case '중국':
                setTimeZones([
                    {city: '상하이', value: 'Asia/Shanghai'},
                    {city: '우루무치', value: 'Asia/Urumqi'},
                ]);
                break;
            case '홍콩':
                setTimeZones([
                    {city: '홍콩', value: 'Asia/Hong_Kong'}
                ]);
                break;
            case '마카오':
                setTimeZones([
                    {city: '마카오', value: 'Asia/Macau'}
                ]);
                break;
            case '대만':
                setTimeZones([
                    {city: '타이베이', value: 'Asia/Taipei'}
                ]);
                break;
            case '인도':
                setTimeZones([
                    {city: '콜카타', value: 'Asia/Kolkata'}
                ]);
                break;
            case '브라질':
                setTimeZones([
                    {city: '상파울로', value: 'America/Sao_Paulo'}
                ]);
                break;
            case '멕시코':
                setTimeZones([
                    {city: '멕시코시티', value: 'America/Mexico_City'}
                ]);
                break;
            case '아르헨티나':
                setTimeZones([
                    {city: '부에노스아이레스', value: 'America/Argentina/Buenos_Aires'}
                ]);
                break;
        }
    }, [selectedCountry]);

    useEffect(() => {
        setSelectedTimeZone(timeZones.length > 0 ? timeZones[0].value : "");
        setCityOptions(timeZones.map(({ city, value }, index) => (
            <option key={index} value={value}>
                {city}
            </option>
        )));
    }, [timeZones])

    return (
        <div id="local-setting-modal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Local Setting Modal"
                appElement={document.getElementById('root')}
                className="local-setting-modal glass" // 커스텀 클래스를 추가합니다.
                overlayClassName="local-setting-overlay" // 오버레이에 대한 커스텀 클래스를 추가합니다.
            >
            <header>
                <h2>시계 설정</h2>
                <button onClick={closeModal}><MdClose size={24}/></button>
            </header>
            <div className="picker first-picker">
                <label>국가</label>
                <select id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    { countryOptions }
                </select>
            </div>
            <div className="picker">
                <label>도시</label>
                <select id="time-zone" value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}>
                    {cityOptions}
                </select>
            </div>
            <button onClick={() => handleTimeZone(selectedCountry, selectedTimeZone)}>선택</button>
        </Modal>
        </div>
    );
}

export default LocalSettingModal; 