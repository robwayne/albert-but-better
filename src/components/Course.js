import "../styles/course.css"
import { useState, useEffect } from 'react';

const Course = props => {

    const [title, setTitle] = useState('TITLE');
    const [description, setDescription] = useState('DESCRIPTION');
    const [timings, setTimings] = useState(['Mon. 10:25 - 11:30', 'Wed. 10:25 - 11:30']);
    const [lectureNum, setLectureNum] = useState(1);
    const [labNum, setLabNum] = useState();
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description);
        setTimings(props.timings);
        setRequirements(props.requirements);
        setLectureNum(props.lectureNum);
        setLabNum(props.labNum);
    }, [props])

    return (
        <div className="course-main-container">
            <div className="course-header">
                <p className="course-title">{title}</p>
                {timings.map(t => <p key={t} className="course-timing">{t}</p>)}
            </div>
            <div className="course-body">
                <div className="course-info">
                    <div className="course-desc">
                        <p className="course-desc-text">{description}</p>
                    </div>
                    <div className="course-detail-container">
                        <div className="lecture-detail">
                            Lecture {lectureNum}
                        </div>
                        {   labNum > 0 ?
                             <div className="lecture-detail">
                                Lab {labNum}
                            </div>
                            : null
                        }
                       
                    </div>
                </div>
                {
                    requirements.length > 0 
                    ? (
                        <>
                            <div className="separator" />
                            <span style={{fontWeight: "bold", marginTop: 5}} >Requirements</span>
                            <div style={{marginTop: 5, marginBottom: 10}}>
                            { requirements.map((req, ind) => <span style={{marginLeft: 10, fontSize: 11}} key={ind}>{ind == requirements.length-1 ? req : req+','} </span> ) }
                            </div>
                        </>
                       )
                    : null
                }
            </div>
        </div>
    );
};

export default Course;