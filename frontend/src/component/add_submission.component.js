import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class AddSubmission extends Component {

    constructor(props){
        super(props);

        this.onChangeSubmissionITno = this.onChangeSubmissionITno.bind(this);
        this.onChangeSubmissionCourse= this.onChangeSubmissionCourse.bind(this);
        this.onChangeSubmissionAssign = this.onChangeSubmissionAssign.bind(this);
        this.onChangeSubmissionFile= this.onChangeSubmissionFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            sub_stud_itno:'',
            sub_course:'',
            sub_assign:'',
            sub_file:'',

        }

    }

    onChangeSubmissionITno(e){
        this.setState({

            sub_stud_itno:e.target.value
        });
    }
    onChangeSubmissionCourse(e){
        this.setState({

            sub_course:e.target.value
        });
    }
    onChangeSubmissionAssign(e){
        this.setState({

            sub_assign:e.target.value
        });
    }
    onChangeSubmissionFile(e){
        this.setState({

            sub_file:e.target.value
        });
    }
    onSubmit(e){

        e.preventDefault();

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

        console.log(`Form Submitted:`);
        console.log(`Submission id:${this.state.sub_stud_itno}`);
        console.log(`Submission date:${now}`);
        console.log(`Submission upload:${this.state.sub_course}`);
        console.log(`Submission course:${this.state.sub_assign}`);
        console.log(`Submission file:${this.state.sub_file}`);

        const newSubmission = {
            sub_stud_itno:this.state.sub_stud_itno,
            sub_up_date:now,
            sub_course:this.state.sub_course,
            sub_assign:this.state.sub_assign,
            sub_file:this.state.sub_file

        };

        axios.post('http://localhost:3002/submissions/add',newSubmission)
            .then(res=>console.log(res.data));


        this.setState({
            sub_stud_itno:'',
            sub_course:'',
            sub_assign:'',
            sub_file:''
        })
    }

    render(){
        return(
            <div style={{marginTop:10}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/subject"  className="nav-link">Back</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>Add Submission</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Id :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.sub_stud_itno}
                               onChange={this.onChangeSubmissionITno}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.sub_course}
                               onChange={this.onChangeSubmissionCourse}
                        />
                    </div>
                    <div className="form-group">
                        <label>Assignment :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.sub_assign}
                               onChange={this.onChangeSubmissionAssign}
                        />
                    </div>
                    <div className="form-group">
                        <label>File :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.sub_file}
                               onChange={this.onChangeSubmissionFile}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Add Submission" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}