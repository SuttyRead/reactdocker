import {Component} from 'react';
import React from "react";
import UserService from "../services/user-service";
import {Link, Redirect} from "react-router-dom";
import {dateValidator, emailValidator, nameValidator, passwordValidator} from "../utils/validator";

class Edit extends Component {

    constructor(props) {
        super(props);
        this.OnSubmitEdit = this.OnSubmitEdit.bind(this);
        this.OnChangeEmailEdit = this.OnChangeEmailEdit.bind(this);
        this.OnChangeBirthdayEdit = this.OnChangeBirthdayEdit.bind(this);
        this.OnChangePasswordEdit = this.OnChangePasswordEdit.bind(this);
        this.OnChangeFirstNameEdit = this.OnChangeFirstNameEdit.bind(this);
        this.OnChangeLastNameEdit = this.OnChangeLastNameEdit.bind(this);
        this.OnChangeRoleEdit = this.OnChangeRoleEdit.bind(this);
    }

    state = {
        user: {
            login: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            birthday: '',
            role: ''
        },
        errorForm: {
            password: true,
            confirmPassword: true,
            email: true,
            firstName: true,
            lastName: true,
            birthday: true,
            loginIsAvailable: true,
            passwordMatch: true
        },
    };

    userService = new UserService();

    componentDidMount(): void {
        const id = this.props.match.params.id;
        this.userService.getUserById(id).then(e => e.json()).then(value => {
            this.setState({
                user: value
            })
        });
    }

    render() {

        if (!this.userService.loggedIn()) {
            return <Redirect to="/login"/>
        }
        if (!this.userService.isAdmin()) {
            return <Redirect to="/home"/>
        }
        return (
            <div className="col-md-2">
                <h2 className="text-center">Edit User</h2>
                <form onSubmit={this.OnSubmitEdit}>

                    <div className="form-group">
                        <label htmlFor="login">Login:</label>
                        <input type="text" placeholder="Enter login" name="login" className="form-control" id="login"
                               value={this.state.user.login}
                               pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" readOnly required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Enter password" name="password"
                               value={this.state.user.password}
                               pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                               onChange={this.OnChangePasswordEdit}
                               className="form-control" id="password" required/>
                    </div>
                    {!this.state.errorForm.password ? (
                        <div className="alert alert-danger" role="alert">Password must be have
                            lowercase and uppercase Latin letters, number. Minimum 8 characters
                        </div>) : null}

                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" placeholder="Enter Email" name="email" className="form-control"
                               value={this.state.user.email}
                               onChange={this.OnChangeEmailEdit}
                               pattern="\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}"
                               id="email" required/>
                    </div>
                    {!this.state.errorForm.email ? (
                        <div className="alert alert-danger" role="alert">
                            Enter correct email. Email
                            must be have @. For example SuttyRead@gmail.com
                        </div>) : null}

                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" placeholder="Enter First Name" name="firstName"
                               value={this.state.user.firstName}
                               onChange={this.OnChangeFirstNameEdit}
                               pattern="^[A-Z]{1}[a-z]{1,25}"
                               className="form-control"
                               id="firstName" required/>
                    </div>
                    {!this.state.errorForm.firstName ? (
                        <div className="alert alert-danger" role="alert">
                            Only latin letter.
                            First letter must be uppercase. For example Sutty
                        </div>) : null}

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" placeholder="Enter Last name" name="lastName"
                               value={this.state.user.lastName}
                               onChange={this.OnChangeLastNameEdit}
                               className="form-control"
                               pattern="^[A-Z]{1}[a-z]{1,25}"
                               id="lastName" required/>
                    </div>
                    {!this.state.errorForm.lastName ? (
                        <div className="alert alert-danger" role="alert">
                            Only latin letter.
                            Last letter must be uppercase. For example Sutty
                        </div>) : null}

                    <div className="form-group">
                        <label htmlFor="birthday">Birthday:</label>
                        <input type="date" placeholder="Enter birthday" name="birthday"
                               value={this.state.user.birthday}
                               onChange={this.OnChangeBirthdayEdit}
                               className="form-control"
                               id="birthday" required/>
                    </div>
                    {!this.state.errorForm.birthday ? (
                        <div className="alert alert-danger" role="alert">
                            Incorrect birthday
                        </div>) : null}

                    <div className='form-group'>
                        <select className="form-control" value={this.state.user.role.name}
                                onChange={this.OnChangeRoleEdit}>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>

                    <button className="btn btn-success">Save</button>
                    <Link role="button" className="btn btn-success" to="/home">Cancel</Link>

                </form>

            </div>
        );
    }

    OnSubmitEdit(event) {
        event.preventDefault();
        this.userService.edit(this.state.user);
        setTimeout(() => {
            this.props.history.push("/home", {edited: true});
        }, 100);
    }

    OnChangePasswordEdit(e) {
        const user = this.state.user;
        user.password = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.password = passwordValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            user: user
        });
    }

    OnChangeEmailEdit(e) {
        const user = this.state.user;
        user.email = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.email = emailValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            user: user
        });
    }

    OnChangeFirstNameEdit(e) {
        const user = this.state.user;
        user.firstName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.firstName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            user: user
        });
    }

    OnChangeLastNameEdit(e) {
        const user = this.state.user;
        user.lastName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.lastName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            user: user
        });
    }

    OnChangeBirthdayEdit(e) {
        const user = this.state.user;
        user.birthday = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.birthday = dateValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            user: user
        });
    }

    OnChangeRoleEdit(e) {
        const user = this.state.user;
        if (e.target.value === "ADMIN") {
            user.role = {
                id: 1,
                name: "ADMIN"
            }
        } else {
            user.role = {
                id: 2,
                name: "USER"
            }
        }
        this.setState({
            user: user
        });
    }
}

export default Edit;