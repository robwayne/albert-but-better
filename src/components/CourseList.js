import { useEffect, useState } from 'react';

import "../styles/courseList.css";
import Course from "./Course";

const CourseList = props => {   

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(props.courses);
    }, [props])

    return (
        <div className="course-list-container">
            <div className="courses-container">
                {
                    courses.map((course, ind) => {
                        const { description, title, instructor, courseID, timing, requirements } = course;
                        return (
                            <Course 
                                key={ind}
                                title={title} 
                                description={description} 
                                instructor={instructor}
                                courseID={courseID}
                                timing={timing}
                                requirements={requirements}
                                lectureNum={ind+1}
                                labNum={0}
                                addCourseHandler={props.addCourseHandler}
                                added={props.added}
                                removeCourseHandler={props.removeCourseHandler}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default CourseList;