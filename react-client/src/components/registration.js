import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import UserService from "../services/user-service";
import {
    dateValidator,
    emailValidator,
    loginValidator,
    nameValidator,
    passwordMatchValidator,
    passwordValidator
} from "../utils/validator";
import ReCAPTCHA from "react-google-recaptcha";

class Registration extends Component {

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
        },
        reCaptcha: ''
    };

    constructor(props) {
        super(props);
        this.OnSubmitRegistration = this.OnSubmitRegistration.bind(this);
        this.OnChangeEmailRegistration = this.OnChangeEmailRegistration.bind(this);
        this.OnChangeBirthdayRegistration = this.OnChangeBirthdayRegistration.bind(this);
        this.OnChangePasswordRegistration = this.OnChangePasswordRegistration.bind(this);
        this.OnChangeConfirmPasswordRegistration = this.OnChangeConfirmPasswordRegistration.bind(this);
        this.OnChangeLoginRegistration = this.OnChangeLoginRegistration.bind(this);
        this.OnChangeFirstNameRegistration = this.OnChangeFirstNameRegistration.bind(this);
        this.OnChangeLastNameRegistration = this.OnChangeLastNameRegistration.bind(this);
        this.OnChangeReCaptcha = this.OnChangeReCaptcha.bind(this);
    }


    userService = new UserService();

    render() {

        if (this.userService.loggedIn()) {
            return <Redirect to="/home"/>
        }

        return (<div>
            <div className="col-md-2">
                <h2 className="text-center">Registration</h2>
                <form onSubmit={this.OnSubmitRegistration}>

                    <div className="form-group">
                        <label htmlFor="login">Login:</label>
                        <input type="text" placeholder="Enter login" name="login" className="form-control" id="login"
                               onChange={this.OnChangeLoginRegistration} pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
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
                               onChange={this.OnChangePasswordRegistration}
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
                               onChange={this.OnChangeConfirmPasswordRegistration}
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
                               onChange={this.OnChangeEmailRegistration}
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
                               pattern="^[A-Z]{1}[a-z]{1,25}"
                               className="form-control"
                               onChange={this.OnChangeFirstNameRegistration}
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
                               className="form-control"
                               onChange={this.OnChangeLastNameRegistration}
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
                               className="form-control"
                               onChange={this.OnChangeBirthdayRegistration}
                               id="birthday" required/>
                    </div>
                    {!this.state.errorForm.birthday ? (
                        <div className="alert alert-danger" role="alert">
                            Incorrect birthday
                        </div>) : null}

                    <ReCAPTCHA sitekey="6LcZDYAUAAAAADb8KgCHNMpBC-rklAFI36qbweTb" onChange={this.OnChangeReCaptcha}/>

                    {this.state.reCaptcha === '' && this.state.reCaptcha.touched ? (
                        <div className="alert alert-danger" role="alert">
                            Fill captcha
                        </div>) : null}

                    <button disabled={this.hasError()} className="btn btn-success">Save</button>
                    <Link role="button" className="btn btn-success" to="/">Cancel</Link>

                </form>

            </div>
        </div>);
    }

    OnSubmitRegistration(event) {
        event.preventDefault();
        this.userService.registration(this.state.userForm);
        setTimeout(() => {
            this.props.history.push("/login");
        }, 100);
    }

    OnChangeLoginRegistration(e) {
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

    OnChangePasswordRegistration(e) {
        const userForm = this.state.userForm;
        userForm.password = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.password = passwordValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeConfirmPasswordRegistration(e) {
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

    OnChangeEmailRegistration(e) {
        const userForm = this.state.userForm;
        userForm.email = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.email = emailValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeFirstNameRegistration(e) {
        const userForm = this.state.userForm;
        userForm.firstName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.firstName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeLastNameRegistration(e) {
        const userForm = this.state.userForm;
        userForm.lastName = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.lastName = nameValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeBirthdayRegistration(e) {
        const userForm = this.state.userForm;
        userForm.birthday = e.target.value;
        let errorForm = this.state.errorForm;
        errorForm.birthday = dateValidator(e.target.value);
        this.setState({
            errorForm: errorForm,
            userForm: userForm
        });
    }

    OnChangeReCaptcha(e) {
        this.setState({
            reCaptcha: e
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
            errorForm.birthday && errorForm.passwordMatch && this.state.reCaptcha);
    }

}

export default Registration;