import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';



const  Assignment =props=>(

    <tr>
        <td>{props.assignment.assign_id}</td>
        <td>{props.assignment.assign_name}</td>
        <td>{props.assignment.assign_upload}</td>
        <td>{props.assignment.assign_course}</td>
        <td>{props.assignment.assign_dueDate}</td>
        <td>
            <Link to = {"/update_assign/"+props.assignment._id}>Update</Link>
        </td>
        <td>
            <Link to = {"/submission_assign/"+props.assignment._id+"/"+props.assignment.assign_course+"/"+props.assignment.assign_name}>View</Link>
        </td>
    </tr>

);

export default class AssignmentList extends Component{

    constructor(props) {
        super(props);
        this.state = {assignments:[]};
    }
    componentDidMount(){

        const courseName =this.props.match.params.tcourse_name;
        axios.get('http://localhost:3002/assignments/',{params:{rcourse_name:courseName}})
            .then(res=>{
                this.setState({assignments:res.data});
            })
            .catch(function(error){
                console.log(error);
            })



    }
    assignmentList(){
        return this.state.assignments.map(function(currentAssignment,i){
            return <Assignment assignment={currentAssignment} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Assignments</h3>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/assignments/add"  className="nav-link">New Assignment</Link>
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
                    {this.assignmentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}