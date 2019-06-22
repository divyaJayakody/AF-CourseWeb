import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class EditAssignment extends Component {

    constructor(props){
        super(props);


        this.onChangeAssignId = this.onChangeAssignId.bind(this);
        this.onChangeAssignName = this.onChangeAssignName.bind(this);
        this.onChangeAssignUpload= this.onChangeAssignUpload.bind(this);
        this.onChangeAssignCourse = this.onChangeAssignCourse.bind(this);
        this.onChangeAssignDueDate = this.onChangeAssignDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            assign_id:'',
            assign_name:'',
            assign_upload:'',
            assign_course:'',
            assign_dueDate:'',

        }

    }

    componentDidMount(){

        console.log('getting http://localhost:3002/assignments/'+this.props.match.params.id);
        axios.get('http://localhost:3002/assignments/'+this.props.match.params.id)
            .then(res=>{
                console.log(res.body);
                this.setState({
                    assign_id:res.data.assign_id,
                    assign_name:res.data.assign_name,
                    assign_upload:res.data.assign_upload,
                    assign_course:res.data.assign_course,
                    assign_dueDate:res.data.assign_dueDate,

                })
            })
            .catch(function(error){
                console.log(error);
            })
    }

    onChangeAssignId(e){
        this.setState({

            assign_id:e.target.value
        });
    }
    onChangeAssignName(e){
        this.setState({

            assign_name:e.target.value
        });
    }
    onChangeAssignUpload(e){
        this.setState({

            assign_upload:e.target.value
        });
    }
    onChangeAssignCourse(e){
        this.setState({

            assign_course:e.target.value
        });
    }
    onChangeAssignDueDate(e){
        this.setState({

            assign_dueDate:e.target.value
        });
    }



    onSubmit(e){

        e.preventDefault();

        const upAssign = {
            assign_id:this.state.assign_id,
            assign_name:this.state.assign_name,
            assign_upload:this.state.assign_upload,
            assign_course:this.state.assign_course,
            assign_dueDate:this.state.assign_dueDate

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
            message:"The deadline for  "+this.state.assign_course+" , "+this.state.assign_name+ "  has been extended to "+this.state.exam_dueDate+" !"

        };
        console.log("Sending "+upAssign.data);

        axios.all([
            axios.post('http://localhost:3002/assignments/update/'+this.props.match.params.id,upAssign),
            axios.post('http://localhost:3002/notifications/add',newMessage)
        ]).then(axios.spread((assignres,notificres)=>{
            console.log(assignres);
            if(assignres.status === 200)
                alert("Updated Succesfully !, notifying students...");
            else if(assignres.status === 400)
                alert("pdating failed,please assign a date later than original date");
            else if(assignres.status === 401)
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
                <h3>Update Assignment</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Assignment Id :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_id}
                               onChange={this.onChangeAssignId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Assignment Name :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_name}
                               onChange={this.onChangeAssignName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload File :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_upload}
                               onChange={this.onChangeAssignUpload}
                        />
                    </div>
                    <div className="form-group">
                        <label>Course:</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_course}
                               onChange={this.onChangeAssignCourse}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date :</label>
                        <input type ="text"
                               className="form-control"
                               value={this.state.assign_dueDate}
                               onChange={this.onChangeAssignDueDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Update Assignment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}