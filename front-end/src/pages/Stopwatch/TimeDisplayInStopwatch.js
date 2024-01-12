function TimeDisplayInStopwtach({ hours, minutes, seconds, milliseconds }) {
    return (
        <>
            <span className="hours">{hours}</span>
            <span>:</span>
            <span className="minutes">{minutes}</span>
            <span>:</span>
            <span className="seconds">{seconds}</span>
            <span>.</span>
            <span className="milliseconds">{milliseconds}</span>
        </>
    )
}

export default TimeDisplayInStopwtach;