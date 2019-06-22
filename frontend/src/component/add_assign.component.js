import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class AddAssign extends Component {

    constructor(props){
        super(props);

        this.onChangeAssignmentId = this.onChangeAssignmentId.bind(this);
        this.onChangeAssignmentName = this.onChangeAssignmentName.bind(this);
        this.onChangeAssignmentUpload= this.onChangeAssignmentUpload.bind(this);
        this.onChangeAssignmentCourse = this.onChangeAssignmentCourse.bind(this);
        this.onChangeAssignmentDueDate= this.onChangeAssignmentDueDate.bind(this);
        this.onChangeAssignmentFile= this.onChangeAssignmentFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            assign_id:'',
            assign_name:'',
            assign_upload:'',
            assign_course:'',
            assign_dueDate:'',
            assign_file:'',

        }

    }

    onChangeAssignmentId(e){
        this.setState({

            assign_id:e.target.value
        });
    }
    onChangeAssignmentName(e){
        this.setState({

            assign_name:e.target.value
        });
    }
    onChangeAssignmentUpload(e){
        this.setState({

            assign_upload:e.target.value
        });
    }
    onChangeAssignmentCourse(e){
        this.setState({

            assign_course:e.target.value
        });
    }
    onChangeAssignmentDueDate(e){
        this.setState({

            assign_dueDate:e.target.value
        });
    }
    onChangeAssignmentFile(e){
        this.setState({

            assign_file:e.target.value
        });
    }
    onSubmit(e){

        e.preventDefault();

        console.log(`Form Submitted:`);
        console.log(`Assignment id:${this.state.assign_id}`);
        console.log(`Assignment name:${this.state.assign_name}`);
        console.log(`Assignment upload:${this.state.assign_upload}`);
        console.log(`Assignment course:${this.state.assign_course}`);
        console.log(`Assignment dueDate:${this.state.assign_dueDate}`);

        const newAssignment = {
            assign_id:this.state.assign_id,
            assign_name:this.state.assign_name,
            assign_upload:this.state.assign_upload,
            assign_course:this.state.assign_course,
            assign_dueDate:this.state.assign_dueDate

        };

        const newAssignmentFile = {
            assign_file:this.state.assign_file

        };

        const dateTime = function timeStamp() {
            var now = new Date();
            var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
            var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
            var suffix = ( time[0] < 12 ) ? "AM" : "PM";
            time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
            time[0] = time[0] || 12;
            for ( var i = 1; i < 3; i++ ) {
                if ( time[i] < 10 ) {
                    time[i] = "0" + time[i];
                }
            }
            return date.join("/") + " " + time.join(":") + " " + suffix;
        };

        const now = dateTime();
        const newMessage= {
            receiver_id:"Special-Notice",
            date:now,
            message:"The assignment "+this.state.assign_name+" of Course "+this.state.assign_course+ " has been uploaded,Upload you answers before "+ this.state.assign_dueDate

        };
        axios.all([
            axios.post('http://localhost:3002/assignments/add',newAssignment),
            axios.post('http://localhost:3002/notifications/add',newMessage),
            axios.post('http://localhost:3002/file/add',newAssignmentFile),
        ]).then(axios.spread((assignres,notificres,fileres)=>{
            if(assignres.status === 200)
                alert("Assignment addded Succesfully !, notifying students...");
            else if(assignres.status === 400)
                alert("failed");
            else if(assignres.status === 401)
                alert("failed");
            else
                alert("failed !");
            console.log(notificres);
            console.log(fileres);
            this.props.history.push('/');

        }));




        this.setState({
            assign_id:'',
            assign_name:'',
            assign_upload:'',
            assign_course:'',
            assign_dueDate:'',
            assign_file:''
        })
    }

    render(){
        return(
            <div style={{marginTop:10}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/home" className="nav-link">Back to Courses</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>New Assignment</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Id :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_id}
                               onChange={this.onChangeAssignmentId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_name}
                               onChange={this.onChangeAssignmentName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_upload}
                               onChange={this.onChangeAssignmentUpload}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_course}
                               onChange={this.onChangeAssignmentCourse}
                        />
                    </div>
                    <div className="form-group">
                        <label>DueDate :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_dueDate}
                               onChange={this.onChangeAssignmentDueDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload File here :</label>
                        <input type ="file"
                               className="form-control"
                               value={this.state.assign_file}
                               onChange={this.onChangeAssignmentFile}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Add Assignment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}