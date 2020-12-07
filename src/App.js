import './styles/App.css';
import userImage from "./user-image.png";
import searchIcon from "./search.svg";
import Course from "./components/Course";

function App() {
  return (
    <div className="main-container">
      <div className="header">
        <div className="user-header-info">
          <img src={userImage} className="user-header-img"/>
          <p className="user-name">Sarah Fuller</p>
        </div>
        <div className="header-title-section">
          <p className="header-title">NYU Albert</p>
          <p className="header-title-desc">(But Better)</p>
        </div>
        <a className="logout-button" href="#">LOGOUT</a>
      </div>
      <div className="content-container">
        <div className="content-section main-content-section">
            <div className="content-section-left">
              <p className="courses-list-title">COURSES</p>
              <Course 
                title={"Introduction to Computer Science"} 
                description={"Computer Science is an innovative and exciting field that focuses on producing efficient solutions for solving problems in any field..."} 
                timings={['Mon. 10:25 - 11:30', 'Wed. 10:25 - 11:30']}
                requirements={[]}
                lectureNum={1}
                labNum={1}
              />
              <Course 
                title={"Discrete Mathematics"} 
                description={"Discrete mathematics concerns the study of mathematical structures that are discrete rather than continuousç..."} 
                timings={['Tue. 9:00 - 10:15', 'Thu. 9:00 - 10:15']}
                requirements={['Intro to Interactive Media', 'Communications Lab']}
                lectureNum={1}
                labNum={0}
              />
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
          <div className="content-section-title">
            <p className="section-title-text">Shopping List</p>
          </div>
          <div className="content-section-action">
            <input className="course-search-input" type="text" id="course-search-input" name="course-search-input" placeholder="Enter course name, number or ID..." />
            <a className="course-search-submit" id="course-search-submit" >
              <img src={searchIcon} className="search-icon" />
            </a>
          </div>
          <div className="content-section-body"></div>
        </div>
      </div>
      </div>
  );
}

export default App;
