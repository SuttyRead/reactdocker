import {Component} from 'react';
import {Redirect} from "react-router-dom";
import React from "react";
import Link from "react-router-dom/es/Link";
import UserList from "./userList";

class HomePage extends Component {
    render() {

        if (!sessionStorage.getItem('token')) {
            return <Redirect to="/login"/>
        }
        // console.log(this.props.history.location.state.edited);
        if (sessionStorage.getItem('role') === 'ADMIN') {
            return <div>
                <Link to="/add">Add User</Link>
                <UserList history={this.props.history} />
            </div>;
        } else {
            return (
                `Hello, ${sessionStorage.getItem('login')}!`
            );
        }

    }
}

export default HomePage;