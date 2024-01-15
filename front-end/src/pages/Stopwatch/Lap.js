import TimeDisplayInStopwatch from './TimeDisplayInStopwatch';
function Lap({lap}) {
    return (
        <tr key={lap.lapNumber}>
            <td>{lap.lapNumber}</td>
            <td>
                <TimeDisplayInStopwatch
                    hours={lap.worldTime.hours}
                    minutes={lap.worldTime.minutes}
                    seconds={lap.worldTime.seconds}
                    milliseconds={lap.worldTime.milliseconds}
                />
            </td>
            <td>
                <TimeDisplayInStopwatch
                    hours={lap.totalTime.hours}
                    minutes={lap.totalTime.minutes}
                    seconds={lap.totalTime.seconds}
                    milliseconds={lap.totalTime.milliseconds}
                />
            </td>
        </tr>
    );
}

export default Lap;