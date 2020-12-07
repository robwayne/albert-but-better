
import '../styles/timetable.css';

const Timetable = props => {

    const dayIndicesMap = {
        'Sun': 0,
        'Mon': 1, 
        'Tue': 2, 
        'Wed': 3, 
        'Thu': 4, 
    }

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const dayHours = [
        '9:00 AM', 
        '10:25 AM', 
        '11:50 AM', 
        '1:15 PM', 
        '2:40 PM',
        '4:05 PM',
        '5:30 PM',
        '6:55 PM',
        '8:20 PM',
    ];

    const parseTiming = timing => {
        const [days, startHour,,,endHour,] = timing.trim().split(' ');
        const [day1, day2] = days.trim().split(',');
        console.log(day1, day2, parseInt(startHour),parseFloat(endHour));
    }

    return (
        <div className="timetable">
            <div className="timetable-hour-mark">
                <div className="hour-title">TIME</div>
                { dayHours.map((hour, index) => <div key={index*13} className="hour">{hour}</div>) }
            </div>
            {
                weekDays.map((day, index) => (
                    <div key={index} className="timetable-day">
                        <p className="day-name">{day}</p>
                        { dayHours.map((hour, index) => <div key={index*13} className="hour-block" />) }
                    </div>
                ))
            }
        </div>
    );   
}

export default Timetable;