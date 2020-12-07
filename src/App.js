import { useEffect, useState } from 'react';

import './styles/App.css';
import userImage from "./user-image.png";
import searchIcon from "./search.svg";
import coursesInfo from "./data/courses-info.json";
import CourseList from "./components/CourseList";

function App() {

  const [coursesDBListDict, setCoursesDBListDict] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseSearchText, setCourseSearchText] = useState('');

  const searchCourses = () => {
    const query = courseSearchText.trim().toLowerCase();
    if (query) {
      let queriedCourses = [];
      if (coursesDBListDict[query]) {
        const courseInfo = coursesDBListDict[query];
        const { timings } = courseInfo;

        for (let i=0;i<timings.length;i++) {
          queriedCourses.push({...courseInfo, timings: undefined, timing: timings[i]});
        }
      } else if (!coursesDBListDict[query]) {
        queriedCourses = Object.keys(coursesDBListDict).map(courseID => {
          if (coursesDBListDict[courseID].title.toLowerCase().includes(query)) {
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
      const courses = [courseDBDict['cs-uh 1050']];
      courses[0].timing = courses[0].timings[0];
      courses[0].timings = undefined;
      setUserCourses(courses);
      setCoursesDBListDict(courseDBDict);
  }, [])

  return (
    <div className="main-container">
      <div className="header">
        <div className="user-header-info">
          <img src={userImage} className="user-header-img"/>
          <p className="user-name">Sarah Fuller</p>
        </div>
        <div className="header-title-section">
          <p className="header-title">NYU Albert Revamped</p>
          {/* <p className="header-title-desc">()</p> */}
        </div>
        <a className="logout-button" href="#">LOGOUT</a>
      </div>
      <div className="content-container">
        <div className="content-section main-content-section">
            <div className="content-section-left">
              <p className="courses-list-title">MY COURSES</p>
              <CourseList courses={userCourses}/>
            </div>
            <div className="content-section-right">
              <div className="timetable">
                <div className="timetable-hour-mark">
                  <div className="hour-title">TIME</div>
                  <div className="hour">8:00 AM</div>
                  <div className="hour">9:00 AM</div>
                  <div className="hour">10:00 AM</div>
                  <div className="hour">11:00 AM</div>
                  <div className="hour">12:00 PM</div>
                  <div className="hour">1:00 PM</div>
                  <div className="hour">2:00 PM</div>
                  <div className="hour">3:00 PM</div>
                  <div className="hour">4:00 PM</div>
                  <div className="hour">5:00 PM</div>
                  <div className="hour">6:00 PM</div>
                  <div className="hour">7:00 PM</div>
                </div>
                <div className="timetable-day">
                  <p className="day-name">Sunday</p>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                </div>
                <div className="timetable-day">
                  <p className="day-name">Monday</p>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                </div>
                <div className="timetable-day">
                  <p className="day-name">Tuesday</p>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                </div>
                <div className="timetable-day">
                  <p className="day-name">Wednesday</p>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                </div>
                <div className="timetable-day">
                  <p className="day-name">Thursday</p>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                  <div className="hour-block"></div>
                </div>
              </div>
            </div>
        </div>
        <div className="content-section">
          <p className="section-title-text">Shopping List</p>
          <div className="content-section-action">
            <input className="course-search-input" type="text" value={courseSearchText} onChange={event => setCourseSearchText(event.target.value)} placeholder="Enter course name or course ID: (example CS-UH 1001)..." />
            <a className="course-search-submit">
              <img src={searchIcon} className="search-icon" onClick={searchCourses}/>
            </a>
          </div>
          <div className="content-section-body">
            {
              filteredCourses.length > 0 ? (<CourseList courses={filteredCourses} />) : null
            }
          </div>
        </div>
      </div>
      </div>
  );
}

export default App;
