import { useEffect, useState } from 'react';

import './styles/App.css';
import userImage from "./user-image.png";
import searchIcon from "./search.svg";
import coursesInfo from "./data/courses-info.json";
import CourseList from "./components/CourseList";
import Timetable from "./components/Timetable"

function App() {

  const [coursesDBListDict, setCoursesDBListDict] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const [userCourseIDs, setUserCourseIDs] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseSearchText, setCourseSearchText] = useState('');

  const searchCourses = (queryString) => {
    const query = queryString.trim().toLowerCase();
    if (query.length >= 1) {
      let queriedCourses = [];
      if (coursesDBListDict[query]) {
        const courseInfo = coursesDBListDict[query];
        const { timings } = courseInfo;

        for (let i=0;i<timings.length;i++) {
          queriedCourses.push({...courseInfo, timings: undefined, timing: timings[i]});
        }
      } else if (!coursesDBListDict[query]) {
        queriedCourses = Object.keys(coursesDBListDict).map(courseID => {
          if (coursesDBListDict[courseID].title.toLowerCase().includes(query) || coursesDBListDict[courseID].courseID.toLowerCase().includes(query)) {
            return  coursesDBListDict[courseID];
          }
        }).filter(course => !!course);
        let courseArr = [];
        queriedCourses.forEach(course => {
          const { timings } = course;
          for (let i=0;i<timings.length;i++) {
            courseArr.push({...course, timings: undefined, timing: timings[i]});
          }
        })
        queriedCourses = courseArr;
      }
      setFilteredCourses(queriedCourses);
    } else {
      setFilteredCourses([]);
    }
  }

  useEffect(() => {
      let courseDBDict = {};
      coursesInfo.forEach(course => {
          const { Title, Description, CourseID, Instructor, Prerequisites, Corequisites, Timing, Status} = course;
          const courseIdLower = CourseID.toLowerCase();
          if (Status === "Cancelled") return;
          if (!courseDBDict[courseIdLower]) {
              // split the preqs into their own course IDs
              const prereqs = Prerequisites.split(';').filter(str => !!str).map(str => str.trim()); 
              const coreqs = Corequisites.split(';').filter(str => !!str).map(str => str.trim());
              const requirements = prereqs.filter(prereq => !coreqs.find(coreq => coreq === prereq)).concat(coreqs);
              courseDBDict[courseIdLower] = {
                  title: Title,
                  description: Description,
                  courseID: CourseID,
                  instructor: Instructor,
                  requirements,
                  timings: [Timing]
              };
          } else {
              courseDBDict[courseIdLower].timings.push(Timing);
          }
      });
      setCoursesDBListDict(courseDBDict);
  }, [])

  const parseTiming = timing => {
    const [days, startHour,,,endHour,] = timing.trim().split(' ');
    const [day1, day2] = days.trim().split(',');
    // const dayIndex = dayIndicesMap[day1.trim()];
    const startOfWorkDay = 9;
    const hr = parseInt(startHour.trim()) < startOfWorkDay ? parseInt(startHour.trim()) + 12 : parseInt(startHour.trim());
    const startHourIndex = hr - startOfWorkDay; 
    let times = {[day1.trim()]: {start: parseFloat(startHour.trim()), end: parseFloat(endHour.trim())}};
    if (day2) {
        times[day2.trim()] = {start: parseFloat(startHour.trim()), end: parseFloat(endHour.trim())};
    }

    return times;
  }  
  
  // userCourses.forEach(uc => {
  //   const uctiming = parseTiming(uc.timing);
  //   Object.keys(courseTiming).map(day => {
  //     console.log("dayday);
  //     if ((uctiming[day].start >= courseTiming[day].start && uctiming[day].start <= courseTiming[day].end) || 
  //       (uctiming[day].end >= courseTiming[day].start && uctiming[day].end <= courseTiming[day].end)) {
  //         alert('This class currently conflicts with', uc.title);
  //       }
  //   })
  // })

  const addCourse = (courseID, lectureNumber) => {
    const lowerCaseCourseID = courseID.toLowerCase();
    if (lowerCaseCourseID && coursesDBListDict[lowerCaseCourseID]) {
      if (!userCourseIDs[lowerCaseCourseID]) {
        const { timings } = coursesDBListDict[lowerCaseCourseID];
        const course = coursesDBListDict[lowerCaseCourseID];
        userCourses.forEach(uc => {
          if ((course.title.toLowerCase().includes("data structure") && uc.title.toLowerCase().includes("introduction to computer science")) ||
            (uc.title.toLowerCase().includes("data structure") && course.title.toLowerCase().includes("introduction to computer science"))) {
              alert("shshs")
            }
        })
        setUserCourses([...userCourses, {...coursesDBListDict[lowerCaseCourseID], timings: undefined, timing: timings[lectureNumber]}]);
        setUserCourseIDs({...userCourseIDs, ...{[lowerCaseCourseID]: courseID}})
      } else {
        alert('It seems this course is already added to your list of courses')
      }
    }
  }

  const removeCourse = (courseID) => {
    const lowerCaseCourseID = courseID.toLowerCase();
    if (lowerCaseCourseID && coursesDBListDict[lowerCaseCourseID]) {
      if (userCourseIDs[lowerCaseCourseID]) {
        const { timings } = coursesDBListDict[lowerCaseCourseID];
        setUserCourses(userCourses.filter(course => course.courseID !== courseID));
        setUserCourseIDs({...userCourseIDs, ...{[lowerCaseCourseID]: undefined}})
      }
    }
  }

  return (
    <div className="main-container">
      <div className="header">
        <div className="user-header-info">
          <img src={userImage} className="user-header-img"/>
          <p className="user-name">Sarah Fuller</p>
        </div>
        <div className="header-title-section">
          <p className="header-title">NYU Albert Revamped</p>
        </div>
        <a className="logout-button" href="#">LOGOUT</a>
      </div>
      <div className="content-container">
        <div className="content-section main-content-section">
            <div className="content-section-left">
              <p className="courses-list-title">MY COURSES</p>
              <CourseList courses={userCourses} addCourseHandler={addCourse} added={true} removeCourseHandler={removeCourse}/>
            </div>
            <div className="content-section-right">
              <Timetable userCourses={userCourses} />
            </div>
        </div>
        <div className="content-section">
          <p className="section-title-text">COURSE SEARCH</p>
          <div className="content-section-action">
            <input className="course-search-input" type="text" value={courseSearchText} onChange={({target: {value}}) => { searchCourses(value); setCourseSearchText(value); }} placeholder="Enter course name or course ID: (example CS-UH 1001)..." />
            <a className="course-search-submit">
              <img src={searchIcon} className="search-icon" onClick={searchCourses}/>
            </a>
          </div>
          <div className="content-section-body">
            {
              filteredCourses.length > 0 ? (<CourseList courses={filteredCourses} addCourseHandler={addCourse} />) : null
            }
          </div>
        </div>
      </div>
      </div>
  );
}

export default App;
