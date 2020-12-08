import { useEffect, useState } from "react";

import '../styles/timetable.css';

const Timetable = ({userCourses}) => {

    const dayIndicesMap = {
        'Sun': 0,
        'Mon': 1, 
        'Tue': 2, 
        'Wed': 3, 
        'Thu': 4, 
    }

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const startOfWorkDay = 9; // day starts at 
    const classHours = [
        '9:00 AM', 
        '10:00 AM', 
        '11:00 AM', 
        '1:00 PM', 
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
    ];

    const validate = (courseTimings) => {
        const timingDict = {};
        let valid = true;
        courseTimings.forEach(ct => {
            for (let i=0;i<weekDays;i++) {
                if (timingDict[i] !== undefined) {
                    if (timingDict[i] === ct.times[i]) { valid = false; break; }
                } else {
                    timingDict[i] = ct.times[i];
                }
            }
            if (!valid) return;
        })
        return valid;
    }

    const parseTiming = timing => {
        const [days, startHour,,,endHour,] = timing.trim().split(' ');
        const [day1, day2] = days.trim().split(',');
        const dayIndex = dayIndicesMap[day1.trim()];
        const hr = parseInt(startHour.trim()) < startOfWorkDay ? parseInt(startHour.trim()) + 12 : parseInt(startHour.trim());
        const startHourIndex = hr - startOfWorkDay; 
        let times = {[day1]: {start: startHour, end: endHour}};
        if (day2) {
            times[day2.trim()] = {start: startHour, end: endHour};
        }

        return times;
    }

    const [coursesToRender, setCoursesToRender] = useState([]);
    
    useEffect(() => {
        console.log(userCourses)
        let userCourseTimings = userCourses.map(({timing, courseID}) => {
            const times = parseTiming(timing);
            return {times, courseID};
        })

        if (userCourseTimings && userCourseTimings.length) { 
            if (validate(userCourseTimings)) {
                setCoursesToRender(userCourseTimings);
            } else {
                alert('It seems some of the courses you have chosen clash/overlap. Check them again before enrolling!')
            }
            // alert('It seems some of the courses you have chosen clash/overlap. Check them again before enrolling!')
        }
    }, [userCourses]);

    return (
        <div className="timetable">
            <div className="timetable-hour-mark">
                <div className="hour-title">TIME</div>
                { classHours.map((hour, index) => <div key={index*17} className="hour">{hour}</div>) }
            </div>
            {
                weekDays.map((day, dayIndex) => {
                    const takenCourses = coursesToRender.filter(c => c.times[dayIndex] !== undefined);
   
                    return (
                        <div key={dayIndex} className="timetable-day">
                            <p className="day-name">{day}</p>
                            { 
                                classHours.map((_, hourIndex) => {
                                    const takenCourse = takenCourses.find(c => c.times[dayIndex] === hourIndex);
                                    if (takenCourse) {
                                        return (
                                            <div key={hourIndex*13} className="taken" >
                                                {takenCourse.courseID}
                                            </div>
                                        )
                                    }
                                    return <div key={hourIndex*13} className="hour-block" />
                                }) 
                            }
                        </div>
                    )
                })
            }
        </div>
    );   
}

export default Timetable;