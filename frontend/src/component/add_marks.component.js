import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class AddAssign extends Component {

    constructor(props){
        super(props);

        this.onChangeMarkMarks = this.onChangeMarkMarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            student_marks:''

        }

    }
    componentDidMount () {

        console.log(this.props.match.params.id+" & "+this.props.match.params.sub_stud_itno+" & "+this.props.match.params.sub_course+" & "+this.props.match.params.sub_assign);

    }

    onChangeMarkMarks(e){
        this.setState({

            student_marks:e.target.value
        });
    }
    onSubmit(e){

        e.preventDefault();

        console.log(`Marks Added:`);
        console.log(`Mark ITNo:${this.props.match.params.sub_stud_itno}`);
        console.log(`Mark Course:${this.props.match.params.sub_course}`);
        console.log(`Mark Assignment:${this.props.match.params.sub_assign}`);
        console.log(`Mark Mark:${this.state.student_marks}`);

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

        const newMark = {
           student_itno:this.props.match.params.sub_stud_itno,
           student_course:this.props.match.params.sub_course,
           student_assign:this.props.match.params.sub_assign,
           student_marks:this.state.student_marks
        };

        const newMessage= {
            receiver_id:this.props.match.params.sub_stud_itno,
            date:now,
           message:"Your Submission for "+this.props.match.params.sub_course+","+this.props.match.params.sub_assign+ "  scored "+this.state.student_marks+" !"

        };


         axios.all([
             axios.post('http://localhost:3002/marks/add',newMark),
             axios.post('http://localhost:3002/notifications/add',newMessage)
         ]).then(axios.spread((markres,notificres)=>{
             console.log(markres);
             if(markres.status === 200)
                 alert("Marks addded Succesfully !, notifying students...");
             else if(markres.status === 400)
                 alert("failed");
             else if(markres.status === 401)
                 alert("failed");
             else
                 alert("failed !");
             console.log(notificres);
             this.props.history.push('/');
         }));


        this.setState({
           student_marks:''
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
                                <Link to="/assignments/submission/:id"  className="nav-link">Submissions</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3>New Mark</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Marks:</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.student_marks}
                               onChange={this.onChangeMarkMarks}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Add Marks" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}