import React, {Component} from 'react';
import UserService from "../services/user-service";
import {Link} from "react-router-dom";

class UserList extends Component {

    state = {
        users: [],
        deleted: false,
        edited: false,
        created: false
    };

    componentDidMount() {
        if (this.props.history.location.state) {
            this.setState({
                edited: this.props.history.location.state.edited,
                created: this.props.history.location.state.created
            })
        }
        this.userService.getAllUsers().then(e => e.json()).then(value => {
            this.setState({
                users: value
            })
        })
    }

    userService = new UserService();

    render() {
        return (<div>

                {this.state.edited ? (
                    <div className="alert alert-success" role="alert">User was successfully edited</div>) : null}
                {this.state.created ? (
                    <div className="alert alert-success" role="alert">User was successfully created</div>) : null}
                {this.state.deleted === true ? (
                    <div className="alert alert-success" role="alert">User was successfully deleted</div>) : null}

                <table className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>Login</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.login}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.birthday}</td>
                            <td>{user.role.name}</td>
                            <td>
                                <Link role="button" className="btn btn-primary" to={`/edit/${user.id}`}>Edit</Link>
                                <button type="submit" onClick={() => this.deleteUser(user.id, user.login)}
                                        className="btn btn-primary">Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    deleteUser(id, login) {
        if (login === sessionStorage.getItem('login')) {
            alert("You cannot delete yourself");
            return;
        }
        let users = [];
        if (window.confirm('Delete ' + login + '?')) {
            this.userService.delete(id).then(e => {
                if (e.status === 200) {
                    this.state.users.map(user => {
                        if (user.id !== id) {
                            users.push(user);
                        }
                        this.setState({
                            users: users
                        })
                    })
                }
            });
        }
        this.setState({
            deleted: true
        })
    }

}

export default UserList;