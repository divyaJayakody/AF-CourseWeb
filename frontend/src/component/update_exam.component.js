import React,{Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default class EditExam extends Component {

    constructor(props){
        super(props);


        this.onChangeExamId = this.onChangeExamId.bind(this);
        this.onChangeExamName = this.onChangeExamName.bind(this);
        this.onChangeExamUpload= this.onChangeExamUpload.bind(this);
        this.onChangeExamCourse = this.onChangeExamCourse.bind(this);
        this.onChangeExamDueDate = this.onChangeExamDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            exam_id:'',
            exam_name:'',
            exam_upload:'',
            exam_course:'',
            exam_dueDate:'',

        }

    }

    componentDidMount(){

        console.log('getting http://localhost:3002/exams/'+this.props.match.params.id);
        axios.get('http://localhost:3002/exams/'+this.props.match.params.id)
            .then(res=>{
                console.log(res.data);
                this.setState({
                    exam_id:res.data.exam_id,
                    exam_name:res.data.exam_name,
                    exam_upload:res.data.exam_upload,
                    exam_course:res.data.exam_course,
                    exam_dueDate:res.data.exam_dueDate,

                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    onChangeExamId(e){
        this.setState({

            exam_id:e.target.value
        });
    }
    onChangeExamName(e){
        this.setState({

            exam_name:e.target.value
        });
    }
    onChangeExamUpload(e){
        this.setState({

            exam_upload:e.target.value
        });
    }
    onChangeExamCourse(e){
        this.setState({

            exam_course:e.target.value
        });
    }
    onChangeExamDueDate(e){
        this.setState({

            exam_dueDate:e.target.value
        });
    }



    onSubmit(e){

        e.preventDefault();

        const upExam = {
            exam_id:this.state.exam_id,
            exam_name:this.state.exam_name,
            exam_upload:this.state.exam_upload,
            exam_course:this.state.exam_course,
            exam_dueDate:this.state.exam_dueDate

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
            message:"Exam for "+this.state.exam_course+","+this.state.exam_name+ "  has been postponed to "+this.state.exam_dueDate+" !"

        };
        console.log("Sending "+upExam.data);

        axios.all([
            axios.post('http://localhost:3002/exams/update/'+this.props.match.params.id,upExam),
            axios.post('http://localhost:3002/notifications/add',newMessage)
        ]).then(axios.spread((examres,notificres)=>{
            console.log(examres);
            if(examres.status === 200)
                alert("Updated Succesfully !, notifying students...");
            else if(examres.status === 400)
                alert("Updating failed");
            else if(examres.status === 401)
                alert("Updating failed,please assign a date later than original date");
            else
                alert("Updating failed !");
            console.log(notificres);
            this.props.history.push('/');

        }));

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
                            <li className="navbar-item">
                                <Link to="/exams/submission/:id"  className="nav-link">Back to list</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>Update Exam</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Exam Id :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_id}
                               onChange={this.onChangeExamId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Exam Name :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_name}
                               onChange={this.onChangeExamName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload File :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_upload}
                               onChange={this.onChangeExamUpload}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course:</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_course}
                               onChange={this.onChangeExamCourse}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_dueDate}
                               onChange={this.onChangeExamDueDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Update Exam" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}