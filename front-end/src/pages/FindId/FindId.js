import { useState } from 'react';

function FindId() {
    const [name, setName] = useState("");
    return (
        <div id="find-id">
            <div>
                <label>이름</label>
                <input 
                    value={name} 
                    type="text" 
                    placeholder="이름"
                    onChange={(e) => {setName(e.currentTarget.value)}}
                />
            </div>
            
        </div>
    );
}

export default FindId; 