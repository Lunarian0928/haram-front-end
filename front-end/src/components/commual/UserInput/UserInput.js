function UserInput({ label, value, type, placeholder, onChange, onToggleVisibility }) {
    return (
        <div>
            <label>{label}</label>
            <input 
                value={value} 
                type={type} 
                placeholder={placeholder}
                onChange={(e) => onChange(e.currentTarget.value)}
            />
            {label === '패스워드' && (
                    <button type="button" onClick={onToggleVisibility}>
                        {(type === "password") ? 'Hide' : 'Show'}
                    </button>
                )}
        </div>
    );
};

export default UserInput;
