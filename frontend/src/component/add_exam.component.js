import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class AddExam extends Component {

    constructor(props){
        super(props);

        this.onChangeExamId = this.onChangeExamId.bind(this);
        this.onChangeExamName = this.onChangeExamName.bind(this);
        this.onChangeExamUpload= this.onChangeExamUpload.bind(this);
        this.onChangeExamCourse = this.onChangeExamCourse.bind(this);
        this.onChangeExamDueDate= this.onChangeExamDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            exam_id:'',
            exam_name:'',
            exam_upload:'',
            exam_course:'',
            exam_dueDate:'',

        }

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

        console.log(`Form Submitted:`);
        console.log(`Exam id:${this.state.exam_id}`);
        console.log(`Exam name:${this.state.exam_name}`);
        console.log(`Exam upload:${this.state.exam_upload}`);
        console.log(`Exam course:${this.state.exam_course}`);
        console.log(`Exam dueDate:${this.state.exam_dueDate}`);

        const newExam = {
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
            message:"The exam "+this.state.exam_name+" of Course "+this.state.exam_course+ " has been uploaded,Upload you answers in 3 hrs!"

        };
        axios.all([
            axios.post('http://localhost:3002/exams/add',newExam),
            axios.post('http://localhost:3002/notifications/add',newMessage)
        ]).then(axios.spread((examres,notificres)=>{
            console.log(examres);
            if(examres.status === 200)
                alert("Exam addded Succesfully !, notifying students...");
            else if(examres.status === 400)
                alert("failed");
            else if(examres.status === 401)
                alert("failed");
            else
                alert("failed !");
            console.log(notificres);
            this.props.history.push('/');
        }));


        this.setState({
            exam_id:'',
            exam_name:'',
            exam_upload:'',
            exam_course:'',
            exam_dueDate:''
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
                            <li className="navbar-item">
                                <Link to="/exams/:id"  className="nav-link"> Exams List </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>Add a new Exam</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Id :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_id}
                               onChange={this.onChangeExamId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_name}
                               onChange={this.onChangeExamName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_upload}
                               onChange={this.onChangeExamUpload}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_course}
                               onChange={this.onChangeExamCourse}
                        />
                    </div>
                    <div className="form-group">
                        <label>DueDate :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.exam_dueDate}
                               onChange={this.onChangeExamDueDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Add Exam" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}