import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';


const Submission =props=>(

    <tr>
        <td>{props.submission.sub_stud_itno}</td>
        <td>{props.submission.sub_up_date}</td>
        <td>{props.submission.sub_course}</td>
        <td>{props.submission.sub_assign}</td>
        <td>{props.submission.sub_file}</td>
        <td>
            <Link to = {"/download/"+props.submission._id}>Download</Link>
        </td>
        <td>
            <Link to = {"/assignments/submission/addmarks/"+props.submission._id+"/"+props.submission.sub_stud_itno+"/"+props.submission.sub_course+"/"+props.submission.sub_assign}>Mark</Link>
        </td>
    </tr>

);

export default class SubmissionList extends Component{

    constructor(props) {
        super(props);
        this.state = {submissions:[]};
    }
    componentDidMount(){
        const courseName =this.props.match.params.assign_course;
        const assignName =this.props.match.params.assign_name;
        const ecourseName =this.props.match.params.exam_course;
        const examName =this.props.match.params.exam_name;

        console.log("a_course Name : "+courseName+":"+this.props.match.params.assign_course);
        console.log("a_assign Name : "+assignName+":"+this.props.match.params.assign_name);
        console.log("e_course Name : "+ecourseName+":"+this.props.match.params.exam_course);
        console.log("e_exam Name : "+examName+":"+this.props.match.params.exam_name);

        if(typeof courseName !== "undefined") {
            console.log("sending a_course Name : "+courseName+":"+this.props.match.params.assign_course);
            console.log("sending a_assign Name : "+assignName+":"+this.props.match.params.assign_name);

            axios.get('http://localhost:3002/submissions/', {
                params: {
                    rcourse_name: courseName,
                    rassign_name: assignName
                }
            })
                .then(res => {
                    this.setState({submissions: res.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }else if(typeof ecourseName !== "undefined"){
            console.log("sending  e_course Name : "+ecourseName+":"+this.props.match.params.exam_course);
            console.log("sending  e_exam Name : "+examName+":"+this.props.match.params.exam_name);

            axios.get('http://localhost:3002/submissions/', {
                params: {
                    rcourse_name: ecourseName,
                    rexam_name: examName
                }
            })
                .then(res => {
                    this.setState({submissions: res.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    submissionList(){
        return this.state.submissions.map(function(currentSubmission,i){
            return <Submission submission={currentSubmission} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Submission List</h3>
                <table className="table table-striped" style={{marginTop :20}}>
                    <thead>
                    <tr>
                        <th>IT Number</th>
                        <th>Date</th>
                        <th>Course</th>
                        <th>Assignment/Exam</th>
                        <th>Submission</th>
                        <th>Download</th>
                        <th>Mark</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.submissionList()}
                    </tbody>
                </table>
                <p>End of List</p>
            </div>

        )
    }

}