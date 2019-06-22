import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';


const Pending =props=>(

    <tr>
        <td>{props.pending.code}</td>
        <td>{props.pending.name}</td>
        <td>{props.pending.semester}</td>
        <td>{props.pending.incharge}</td>
        <td>{props.pending.credits}</td>
        <td>
            <Link to = {"course/accept/"+props.pending._id+"/"+props.pending.code+"/"+props.pending.name+"/"+props.pending.semester+"/"+props.pending.credits}>View Course</Link>
        </td>
    </tr>

);

export default class PendingList extends Component{

    constructor(props) {
        super(props);
        this.state = {pendings:[]};
    }
    componentDidMount(){
        const course_instructor ="Divya";

        axios.get('http://localhost:3002/pending/',{params:{rcourse_instructor:course_instructor}})
            .then(res=>{
                this.setState({pendings:res.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }
    pendingList(){
        return this.state.pendings.map(function(currentPending,i){
            return <Pending pending={currentPending} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/home" className="nav-link">Back to Courses</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>Pending List</h3>
                <table className="table table-striped" style={{marginTop :20}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>Instructor</th>
                        <th>Credits Given</th>
                        <th>Accept & Create</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.pendingList()}
                    </tbody>
                </table>
            </div>

        )
    }

}