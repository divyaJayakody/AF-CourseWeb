import React,{Component} from 'react';
import axios from'axios';
import {Link} from "react-router-dom";


const Notification = props=>(

    <tr>
        <td>{props.notification.receiver_id}</td>
        <td>{props.notification.date}</td>
        <td>{props.notification.message}</td>
    </tr>

);

export default class ViewNotificList extends Component{

    constructor(props) {
        super(props);
        this.state = {notifications:[]};
    }
    componentDidMount(){
        axios.get('http://localhost:3002/notifications')
            .then(res=>{
                this.setState({notifications:res.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }
    notificationList(){
        return this.state.notifications.map(function(currentNotification,i){
            return <Notification notification={currentNotification} key={i}/>
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
                <h3>Notifications</h3>
                <table className="table table-striped" style={{marginTop :20}}>
                    <thead>
                    <tr>
                        <th>Reciever</th>
                        <th>Date</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.notificationList()}
                    </tbody>
                </table>
            </div>

        )
    }

}