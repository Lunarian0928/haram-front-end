import './Record.scss';
import { FaFileCsv } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { useState } from 'react';
import axios from 'axios';
import LapsRecordModal from './LapsRecordModal';
function Record({key, record, setLapsRecords}) {
    const [lapsRecordModalIsOpen, setLapsRecordModalIsOpen] = useState(false);
    const lapsRecordModalOpen = () => {
        setLapsRecordModalIsOpen(true);
    }

    const lapsRecordModalClose = () => {
        setLapsRecordModalIsOpen(false);
    }
    
    const updateLapsRecords = () => {
        axios.get("/api/laps_record/read")
        .then((res) => {
            setLapsRecords(res.data);
        })
    }

    const deleteLapsRecord = ()  => {
        axios.post("/api/laps_record/delete", {
            id: record.id
        })
        .then((res) => {
            if (res.data) {
                updateLapsRecords();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const exportToCsv = () => {
        // 서버에 보낼 데이터
        const dataToSend = {
            label: record.label,
            laps: record.laps,
        };
    
        // 서버에 POST 요청 보내기
        axios.post("/api/laps_record/export_to_csv", dataToSend, { responseType: 'arraybuffer' })
        .then((response) => {
            // 서버에서 받은 파일 데이터로 Blob 생성
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
    
            // Blob을 URL로 변환하여 다운로드 링크 생성
            const url = window.URL.createObjectURL(blob);
    
            // 다운로드 링크 생성 및 클릭
            const a = document.createElement('a');
            a.href = url;
            a.download = `${record.label}.csv`;
            document.body.appendChild(a);
            a.click();
    
            // 다운로드 후 URL 해제
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((error) => {
            console.error('Error exporting to CSV:', error);
        });
    };

    return (
        <div className="record glass" key={key}>
            <LapsRecordModal 
                modalIsOpen={lapsRecordModalIsOpen} 
                closeModal={lapsRecordModalClose}
                record={record}
            />
            <header>
                <h3>{record.label}</h3>
                <div className="button-list">
                    <button className="delete-button glass" onClick={() => deleteLapsRecord()}>
                        <MdDelete size="24" color="black" />
                    </button>
                </div>
            </header>
            <div className="button-list">
                <button className="export-csv-button glass" onClick={() => lapsRecordModalOpen()}>
                    확인하기
                </button>
                <button className="export-csv-button glass" onClick={() => exportToCsv()}>
                    <FaFileCsv color="black" size="24"/>
                    csv로 내보내기
                </button>
            </div>
        </div>
    );
}

export default Record;