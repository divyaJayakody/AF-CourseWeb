import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class AddCourse extends Component {

    constructor(props){
        super(props);

        this.onChangeCourseInstructor = this.onChangeCourseInstructor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            courseInstruct:'',
        }

    }

    componentDidMount () {

        console.log(this.props.match.params.id+" & "+this.props.match.params.code+" & "+this.props.match.params.name+" & "+this.props.match.params.semester+" & "+this.props.match.params.credits)
    }

    onChangeCourseInstructor(e){
        this.setState({

            courseInstruct:e.target.value
        });
    }

    onSubmit(e){

        e.preventDefault();

        //function timestamp() full credits @hurjas hurjas/timestamp.js (gist.github.com/hurjas/2660489)
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
        const id=this.props.match.params.id;
        const pcourse_id =this.props.match.params.code;
        const pcourse_name =this.props.match.params.name;
        const pcourse_semester = this.props.match.params.semester;
        const pcourse_instructor = this.state.courseInstruct;
        const pcourse_credits = this.props.match.params.credits;
        const now = dateTime();



        const newCourse = {
            tcourse_code:pcourse_id,
            tcourse_name:pcourse_name,
            tcourse_semester:pcourse_semester,
            tcourse_instructor:pcourse_instructor,
            tcourse_credits:pcourse_credits,
            tcourse_approved_Date:now
        };

        const newMessage= {
            receiver_id:"Special-Notice",
            date:now,
            message:"The Students can now enroll in "+pcourse_id+" , "+pcourse_name+ " module !"

        };
        console.log(' about to delete http://localhost:3002/pending/remove/'+id);
        console.log(newCourse);
        axios.all([
            axios.post('http://localhost:3002/courses/add',newCourse),
            axios.post('http://localhost:3002/notifications/add',newMessage)
        ]).then(axios.spread((courseres,notificres)=>{
            console.log(courseres);
            if(courseres.status === 200)
                alert("Course was accepted Succesfully !, notifying students...");
            else if(courseres.status === 400)
                alert("Course was not accepted");
            else if(courseres.status === 401)
                alert("failed");
            else
                alert("failed !");
            console.log(notificres);
            this.props.history.push('/');
        }));

        axios.delete('http://localhost:3002/pending/remove/'+id)
            .then(res=>{
                console.log(res);
            });

        this.setState({
            courseInstruct:'',
        })
    }

    render(){
        return(
            <div style={{marginTop:10}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/pending"  className="nav-link">Back to Pending Courses</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <p>Confirm the acceptance of the pending module..</p>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Instructor Name :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.courseInstruct}
                               onChange={this.onChangeCourseInstructor}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Add to Courses" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}