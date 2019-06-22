import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';


const  Course =props=>(

    <tr>
        <td>{props.course.tcourse_code}</td>
        <td>{props.course.tcourse_name}</td>
        <td>{props.course.tcourse_semester}</td>
        <td>{props.course.tcourse_instructor}</td>
        <td>{props.course.tcourse_credits}</td>
        <td>{props.course.tcourse_approved_Date}</td>
        <td>
            <Link to = {"/assignments/"+props.course._id+"/"+props.course.tcourse_name}>View</Link>
        </td>
        <td>
            <Link to = {"/exams/"+props.course._id+"/"+props.course.tcourse_name}>View</Link>
        </td>
    </tr>

);

export default class CourseList extends Component{

    constructor(props) {
        super(props);
        this.state = {courses:[]};
    }
    componentDidMount(){
        const course_instructor ="Divya";

        console.log(course_instructor);
        axios.get('http://localhost:3002/courses',{params:{rcourse_instructor:course_instructor}})
            .then(res=>{
                this.setState({courses:res.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }
    courseList(){
        return this.state.courses.map(function(currentCourse,i){
            return <Course course={currentCourse} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Course List</h3>
                <table className="table table-striped" style={{marginTop :20}}>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>Instructor</th>
                        <th>Credits Given</th>
                        <th>Date Approved</th>
                        <th>Assignments</th>
                        <th>Exams</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.courseList()}
                    </tbody>
                </table>
            </div>

        )
    }

}