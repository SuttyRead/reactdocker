import React, {Component} from 'react';
import UserService from "../services/user-service";
import {Link, Redirect} from "react-router-dom";
import {
    dateValidator,
    emailValidator,
    loginValidator,
    nameValidator,
    passwordMatchValidator,
    passwordValidator
} from "../utils/validator";

class Add extends Component {

    constructor(props) {
        super(props);
        this.OnSubmitAdd = this.OnSubmitAdd.bind(this);
        this.OnChangeEmailAdd = this.OnChangeEmailAdd.bind(this);
        this.OnChangeBirthdayAdd = this.OnChangeBirthdayAdd.bind(this);
        this.OnChangePasswordAdd = this.OnChangePasswordAdd.bind(this);
        this.OnChangeConfirmPasswordAdd = this.OnChangeConfirmPasswordAdd.bind(this);
        this.OnChangeLoginAdd = this.OnChangeLoginAdd.bind(this);
        this.OnChangeFirstNameAdd = this.OnChangeFirstNameAdd.bind(this);
        this.OnChangeLastNameAdd = this.OnChangeLastNameAdd.bind(this);
    }

    state = {
        userForm: {
            login: '',
            password: '',
            confirmPassword: '',
            email: '',
            firstName: '',
            lastName: '',
            birthday: ''

        },
        errorForm: {
            login: true,
            password: true,
            confirmPassword: true,
            email: true,
            firstName: true,
            lastName: true,
            birthday: true,
            loginIsAvailable: true,
            passwordMatch: true
        }
    };

    userService = new UserService();

    render() {

        if (!this.userService.loggedIn()) {
            return <Redirect to="/login"/>
        }
        if (!this.userService.isAdmin()) {
            return <Redirect to="/home"/>
        }

        return (
            <div className="col-md-2">
                <h2 className="text-center">Add User</h2>
                <form onSubmit={this.OnSubmitAdd}>

                    <div className="form-group">
                        <label htmlFor="login">Login:</label>
                        <input type="text" placeholder="Enter login" name="login" className="form-control" id="login"
                               onChange={this.OnChangeLoginAdd} pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
                               required/>
                    </div>
                    {!this.state.errorForm.login ? (<div className="alert alert-danger" role="alert">
                        Uppercase and lowercase letter.
                        Must be 2-20 characters. Without specifically characters #,$,% and so on. For example SuttyRead
                    </div>) : null}

                    {!this.state.errorForm.loginIsAvailable ? (<div className="alert alert-danger" role="alert">
                        This login already exist!
                    </div>) : null}

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Enter password" name="password"
                               pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                               onChange={this.OnChangePasswordAdd}
                               className="form-control" id="password" required/>
                    </div>
                    {!this.state.errorForm.password ? (
                        <div className="alert alert-danger" role="alert">Password must be have
                            lowercase and uppercase Latin letters, number. Minimum 8 characters
                        </div>) : null}

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input type="password" placeholder="Enter confirm password"
                               pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                               onChange={this.OnChangeConfirmPasswordAdd}
                               name="confirmPassword"
                               className="form-control" id="confirmPassword" required/>
                    </div>
                    {!this.state.errorForm.confirmPassword ? (
                        <div className="alert alert-danger" role="alert">Password must be have
                            lowercase and uppercase Latin letters, number. Minimum 8 characters
                        </div>) : null}

                    {!this.state.errorForm.passwordMatch ? (
                        <div className="alert alert-danger" role="alert">Password don't match</div>) : null}

                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" placeholder="Enter Email" name="email" className="form-control"
                               onChange={this.OnChangeEmailAdd}
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
                               onChange={this.OnChangeFirstNameAdd}
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
                               onChange={this.OnChangeLastNameAdd}
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
                               onChange={this.OnChangeBirthdayAdd}
                               className="form-control"
                               id="birthday" required/>
                    </div>
                    {!this.state.errorForm.birthday ? (
                        <div className="alert alert-danger" role="alert">
                            Incorrect birthday
                        </div>) : null}

                    <button disabled={this.hasError()} className="btn btn-success">Save</button>
                    <Link role="button" className="btn btn-success" to="/home">Cancel</Link>

                </form>

            </div>);
    }

    OnSubmitAdd(event) {
        event.preventDefault();
        this.userService.add(this.state.userForm);
        setTimeout(() => {
            this.props.history.push("/home", {created: true});
        }, 100);
    }

    OnChangeLoginAdd(e) {
        const userForm = this.state.userForm;
        userForm.login = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.login = loginValidator(e.target.value);
        errorForm.loginIsAvailable = this.loginIsAvailable(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangePasswordAdd(e) {
        const userForm = this.state.userForm;
        userForm.password = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.password = passwordValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeConfirmPasswordAdd(e) {
        const userForm = this.state.userForm;
        userForm.confirmPassword = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.confirmPassword = passwordValidator(e.target.value);
        errorForm.passwordMatch = passwordMatchValidator(this.state.userForm.password, e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeEmailAdd(e) {
        const userForm = this.state.userForm;
        userForm.email = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.email = emailValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeFirstNameAdd(e) {
        const userForm = this.state.userForm;
        userForm.firstName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.firstName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeLastNameAdd(e) {
        const userForm = this.state.userForm;
        userForm.lastName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.lastName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeBirthdayAdd(e) {
        const userForm = this.state.userForm;
        userForm.birthday = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.birthday = dateValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    loginIsAvailable(login) {
        this.userService.getUserByLogin(login).then(e => e.json()).then(data => {
            let errorForm = this.state.errorForm;
            if (data.loginIsAvailable) {
                errorForm.loginIsAvailable = true;
                this.setState({
                    errorForm: errorForm
                })
            } else {
                errorForm.loginIsAvailable = false;
                this.setState({
                    errorForm: errorForm
                })
            }
        });
    }

    hasError() {
        const errorForm = this.state.errorForm;
        return !(errorForm.login && errorForm.password && errorForm.confirmPassword &&
            errorForm.email && errorForm.firstName && errorForm.lastName &&
            errorForm.birthday && errorForm.passwordMatch && errorForm.loginIsAvailable);
    }
}

export default Add;