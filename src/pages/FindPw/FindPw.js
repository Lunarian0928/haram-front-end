import { useState } from 'react';   

function FindPw() {
    const [id, setId] = useState("");
    return (
        <div id="find-pw">
            <div>
                <label>아이디</label>
                <input 
                    value={id} 
                    type="text" 
                    placeholder="아이디"
                    onChange={(e) => {setId(e.currentTarget.value)}}
                />
            </div>
        </div>
    );
}

export default FindPw; 