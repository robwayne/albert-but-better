import "../styles/course.css"
import { useState, useEffect } from 'react';
import Modal from "react-modal"

Modal.setAppElement('#root');

const modalStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      margin: 50,
      backgroundColor: '#440079',
      color: '#fff'
    }
};

const Course = props => {

    const [title, setTitle] = useState('TITLE');
    const [courseID, setCourseID] = useState();
    const [instructor, setInstructor] = useState();
    const [description, setDescription] = useState('DESCRIPTION');
    const [timing, setTiming] = useState('TIMING');
    const [lectureNum, setLectureNum] = useState(1);
    const [labNum, setLabNum] = useState(0);
    const [component, setComponent] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [requirements, setRequirements] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const showDescriptionModal = () => {
        setShowModal(true);
    };

    const closeDescriptionModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setTitle(props.title);
        setCourseID(props.courseID);
        setInstructor(props.instructor);
        setDescription(props.description);
        setTiming(props.timing);
        setRequirements(props.requirements);
        setLectureNum(props.lectureNum);
        setLabNum(props.labNum);
        setComponent(props.component);
        setIsAdded(props.added);
    }, [props])

    return (
        <div className="course-main-container">
            <div className="course-header">
                <div className="header-button" onClick={() => { isAdded ? props.removeCourseHandler(courseID) : props.addCourseHandler(courseID, lectureNum-1) }}>
                    <p>{isAdded ? "x" : "+"}</p>
                </div>
                <p className="course-title">{title}</p>
                <p className="course-header-important">{courseID}</p>
                <p className="course-header-important">{instructor}</p>
                <p className="course-timing">{timing}</p>
            </div>
            <div className="course-body">
                <div className="course-info">
                    <div className="course-desc" onClick={showDescriptionModal}>
                        <p className="course-desc-text">Click to see course description</p>
                    </div>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeDescriptionModal}
                        contentLabel={"Course Description"}
                        style={modalStyles}
                    >
                        <p>{description}</p>
                    </Modal>
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
                            <div className="requirements-container">
                                { requirements.map((req, ind) => <p style={{fontSize: 11, margin: 3}} key={ind}>{`${ind+1}) ${req}`} </p> ) }
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