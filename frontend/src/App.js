import React from 'react';

import './App.css';
import {BrowserRouter as Router ,Route,Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import PendingList from "../src/component/view_pending_list.component";
import CourseList from "../src/component/view_course_list.component";
import AssignmentList from "../src/component/view_assign_list.component";
import ExamList from "../src/component/view_exam_list.component";
import SubmissionList from "../src/component/view_submission_list.component";
import ViewNotificList from "../src/component/view_notific_list.component";

import AddAssign from "../src/component/add_assign.component";
import AddExam from "../src/component/add_exam.component";
import AddMarks from "../src/component/add_marks.component";
import AddSubmissions from "../src/component/add_submission.component";
import AddCourse from "../src/component/update_pcourse.component";

import EditAssignment from "../src/component/update_assign.component.js";
import EditExam from "./component/update_exam.component";

import StudentView from "../src/component/StudentView";
import FileUploadView from "../src/component/FileUploadView";
import LecturerView from "../src/component/LecturerView";


/*

import SubmissionList from "../src/component/view_submission_list.component";

import UpdateExam from "../src/component/update_exam.component.js";
*/
import logo from './logo.svg';


function App() {
    return (

        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="https://codingthesmartway.com" >
                        <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com"/>
                    </a>
                    <Link to="/" className="navbar-brand">CourseWeb</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Courses</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/pending" className="nav-link">Pending Approvals</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/notifications" className="nav-link">Notifications</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
               <Route path="/" exact component={CourseList}/>
                <Route path="/home" exact component={CourseList}/>

                <Route path="/assignments/:id/:tcourse_name" exact component={AssignmentList}/>
                <Route path="/assignments/add" exact component={AddAssign}/>
                <Route path="/update_assign/:id/" exact component={EditAssignment}/>
                <Route path="/submission_assign/:id/:assign_course/:assign_name" exact component={SubmissionList}/>
                <Route path="/assignments/submission/add/:id" exact component={AddSubmissions}/>
                <Route path="/assignments/submission/addmarks/:id/:sub_stud_itno/:sub_course/:sub_assign" exact component={AddMarks}/>

                <Route path="/exams/:id/:tcourse_name" exact component={ExamList}/>
                <Route path="/exams/add" exact component={AddExam}/>
                <Route path="/update_exam/:id" exact component={EditExam}/>
                <Route path="/submission_exam/:id/:exam_course/:exam_name" exact component={SubmissionList}/>
                <Route path="/exams/submission/add/:id" exact component={AddSubmissions}/>
                <Route path="/exams/submission/addmarks/:id/:sub_stud_itno/:sub_course/:sub_assign" exact component={AddMarks}/>

                <Route path="/pending" exact component={PendingList}/>
                <Route path="/course/accept/:id/:code/:name/:semester/:credits" exact component={AddCourse}/>
                <Route path="/notifications" exact component={ViewNotificList}/>

                <Route path="/Student/" component={StudentView} />
                <Route path="/FileUpload/" component={FileUploadView} />
                <Route path="/LecturerView/" component={LecturerView} />

            </div>
        </Router>
    );
}

export default App;

