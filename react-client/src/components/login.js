import React, {Component} from 'react';
import UserService from "../services/user-service";
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                login: '',
                password: ''
            },
            role: sessionStorage.getItem('role'),
            incorrectData: false,
        };

        this.OnChangeLoginLogIn = this.OnChangeLoginLogIn.bind(this);
        this.OnChangePasswordLogIn = this.OnChangePasswordLogIn.bind(this);
        this.OnSubmitLogin = this.OnSubmitLogin.bind(this);
    }

    userService = new UserService();

    render() {

        if (this.userService.loggedIn()) {
            return <Redirect to="/home"/>
        }

        return (
            <div>
                <div className="col-md-2">

                    {this.state.incorrectData ?
                        <div className="alert alert-danger" role="alert">Login or password incorrect</div> : null}

                    <form className="form" onSubmit={this.OnSubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="login">Login:</label>
                            <input type="text" placeholder="Login" name="login" className="form-control" id="login"
                                   onChange={this.OnChangeLoginLogIn}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" placeholder="Password" name="password" className="form-control"
                                   onChange={this.OnChangePasswordLogIn}
                                   id="password" required/>
                        </div>
                        <button className="btn btn-success">Log in</button>
                    </form>
                </div>
            </div>
        );
    }

    OnSubmitLogin(event) {
        event.preventDefault();
        this.userService.login(this.state.loginForm).then(e => e.json()).then(data => {
            if (data.login === null) {
                this.setState({
                    incorrectData: true
                });
                return;
            } else {
                this.setState({
                    incorrectData: false
                });
            }
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('login', data.login);
            sessionStorage.setItem('role', data.role.name);
        });
        setTimeout(() => {
            if (!this.state.incorrectData) {
                this.props.history.push("/home");
            }
        }, 300);
    }

    OnChangeLoginLogIn(e) {
        const loginForm = this.state.loginForm;
        loginForm.login = e.target.value;
        this.setState({
            loginForm: loginForm
        })
    }

    OnChangePasswordLogIn(e) {
        const loginForm = this.state.loginForm;
        loginForm.password = e.target.value;
        this.setState({
            loginForm: loginForm
        })
    }

}

export default Login;