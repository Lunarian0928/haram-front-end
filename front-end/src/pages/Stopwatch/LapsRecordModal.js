import './LapsRecordModal.scss';
import { MdClose, MdFilterAlt, MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Lap from './Lap';

function LapsRecordModal({modalIsOpen, closeModal, record}) {
    const [label, setLabel] = useState("");
    const [laps, setLaps] = useState([]);
    const [isAscending, setIsAscending] = useState({
        lapNumber: true,
        worldTime: false,
        totalTime: false
    });

    // laps를 매개변수 record를 이용하여 업데이트
    useEffect(() => {
        if (record.laps !== undefined) setLaps(record.laps);
    }, [])

    const calculateMilliseconds = (stopwatchTime) => {
        const milliseconds = stopwatchTime.hours * 3600000 +
            stopwatchTime.minutes * 60000 +
            stopwatchTime.seconds * 1000 +
            stopwatchTime.milliseconds;
        return milliseconds;
    }

    const sortByLapNumber = () => {
        setIsAscending(prevIsAscending => {
            if (!prevIsAscending.lapNumber) {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return lap1.lapNumber - lap2.lapNumber;
                });
                setLaps(sortedLaps);
            } else {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return lap2.lapNumber - lap1.lapNumber;
                });
                setLaps(sortedLaps);
            }
            return {...prevIsAscending, lapNumber: !prevIsAscending.lapNumber};
        });
    };

    const sortByWorldTime = () => {
        setIsAscending(prevIsAscending => {
            if (!prevIsAscending.worldTime) {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return calculateMilliseconds(lap1.worldTime) - calculateMilliseconds(lap2.worldTime);
                });
                console.log("Sorted laps by worldTime (ascending):", sortedLaps);
                setLaps(sortedLaps);
            } else {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return calculateMilliseconds(lap2.worldTime) - calculateMilliseconds(lap1.worldTime);
                });
                console.log("Sorted laps by worldTime (descending):", sortedLaps);
                setLaps(sortedLaps);
            }
            return {...prevIsAscending, worldTime: !prevIsAscending.worldTime};
        });
    };
    
    const sortByTotalTime = () => {
        setIsAscending(prevIsAscending => {
            if (!prevIsAscending.totalTime) {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return lap1.elapsedTime - lap2.elapsedTime;
                });
                setLaps(sortedLaps);
            } else {
                const sortedLaps = [...laps].sort((lap1, lap2) => {
                    return lap2.elapsedTime - lap1.elapsedTime;
                });
                setLaps(sortedLaps);
            }
            return {...prevIsAscending, totalTime: !prevIsAscending.totalTime};
        });
    };

    return (
        <div id="laps-record-modal">
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                contentLabel="Laps Record Modal"
                appElement={document.getElementById('root')}
                className="laps-record-modal glass"
                overlayClassName="laps-record-overlay"
            >
                <header>
                <h3>{record.label}</h3>
                    <button onClick={() => {
                        closeModal();
                    }}>
                        <MdClose size="24" color="black"/>
                    </button>
                </header>
                <table className="laps-table">
                    <thead className="glass">
                        <tr>
                            <th>
                                랩
                                <button 
                                    className="sort-button"
                                    onClick={() => sortByLapNumber()}
                                >
                                    {   
                                        !isAscending.lapNumber ?
                                        <MdArrowDropDown size="24" color="black"/> :
                                        <MdArrowDropUp size="24" color="black"/>
                                    }
                                </button>    
                            </th>
                            <th>
                                세계 시각     
                                <button 
                                    className="sort-button"
                                    onClick={() => sortByWorldTime()}
                                >
                                    {   
                                        !isAscending.worldTime ?
                                        <MdArrowDropDown size="24" color="black"/> :
                                        <MdArrowDropUp size="24" color="black"/>
                                    }
                                </button>    
                            </th>
                            <th>
                                총 시간
                                <button 
                                    className="sort-button"
                                    onClick={() => sortByTotalTime()}
                                >
                                    {   
                                        !isAscending.totalTime ?
                                        <MdArrowDropDown size="24" color="black"/> :
                                        <MdArrowDropUp size="24" color="black"/>
                                    }
                                </button>    
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            laps.map((lap, _) => (
                                <Lap lap={lap}/>
                            )).reverse() 
                        }
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default LapsRecordModal;