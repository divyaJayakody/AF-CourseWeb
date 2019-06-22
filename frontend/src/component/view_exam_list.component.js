import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';


const Exam =props=>(

    <tr>
        <td>{props.exam.exam_id}</td>
        <td>{props.exam.exam_name}</td>
        <td>{props.exam.exam_upload}</td>
        <td>{props.exam.exam_course}</td>
        <td>{props.exam.exam_dueDate}</td>
        <td>
            <Link to = {"/update_exam/"+props.exam._id}>Update</Link>
        </td>
        <td>
            <Link to = {"/submission_exam/"+props.exam._id+"/"+props.exam.exam_course+"/"+props.exam.exam_name}>View</Link>
        </td>
    </tr>

);

export default class ExamList extends Component{

    constructor(props) {
        super(props);
        this.state = {exams:[]};
    }
    componentDidMount(){
        const courseName =this.props.match.params.tcourse_name;
        axios.get('http://localhost:3002/exams/',{params:{rcourse_name:courseName}})
            .then(res=>{
                this.setState({exams:res.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }
    examList(){
        return this.state.exams.map(function(currentExam,i){
            return <Exam exam={currentExam} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Exams</h3>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/exams/add"  className="nav-link">New Exam</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <table className="table table-striped" style={{marginTop :20}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>File</th>
                        <th>Course</th>
                        <th>DueDate</th>
                        <th>Update</th>
                        <th>Submissions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.examList()}
                    </tbody>
                </table>

            </div>

        )
    }

}