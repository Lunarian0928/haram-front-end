function TimeDisplayInStopwtach({ hours, minutes, seconds, milliseconds }) {
    return (
        <>
            <span className="hours">{String(hours).padStart(2, '0')}</span>
            <span>:</span>
            <span className="minutes">{String(minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span className="seconds">{String(seconds).padStart(2, '0')}</span>
            <span>.</span>
            <span className="milliseconds">{String(milliseconds).padStart(2, '0')}</span>
        </>
    )
}

export default TimeDisplayInStopwtach;