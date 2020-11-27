import './App.css';
import userImage from "./user-image.png";
import searchIcon from "./search.svg";

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
        <a className="logout-button" href="https://www.google.com">Logout</a>
      </div>
      <div className="content-container">
        <div className="content-section">
          <div classNam="content-section-title">
            <p className="section-title-text">Course Search</p>
          </div>
          <div className="content-section-action">
            <input className="course-search-input" type="text" id="course-search-input" name="course-search-input" placeholder="Enter course name, number or ID..." />
            <a className="course-search-submit" id="course-search-submit" >
              <img src={searchIcon} className="search-icon" />
            </a>
          </div>
          <div className="content-section-body"></div>
        </div>
        <div className="content-section center-content-section">
          <div classNam="content-section-title">
            <p className="section-title-text">Your Courses</p>
          </div>
          <div className="content-section-action">
            <input className="course-search-input" type="text" id="course-search-input" name="course-search-input" placeholder="Enter course name, number or ID..." />
            <a className="course-search-submit" id="course-search-submit" >
              <img src={searchIcon} className="search-icon" />
            </a>
          </div>
          <div className="content-section-body"></div>
        </div>
        <div className="content-section">
          <div classNam="content-section-title">
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
