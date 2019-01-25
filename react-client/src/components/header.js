import React, {Component} from 'react';
import {Link} from "react-router-dom";
import UserService from "../services/user-service";

class Header extends Component {

    userService = new UserService();

    render() {
        const login = sessionStorage.getItem('login');
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">React</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Main</Link>
                    </li>

                    {login ? (<li className="nav-item">
                        <Link className="nav-link" to="/registration">Home</Link>
                    </li>) : null}

                    {login ? null : (<li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>)}

                    {login ? null : (<li className="nav-item">
                        <Link className="nav-link" to="/registration">Registration</Link>
                    </li>)}

                </ul>

                {login ? <div>{login}, <Link onClick={() => this.userService.logout()} to="/login"> Logout</Link>
                </div> : null}

            </div>
        </nav>);
    }
}

export default Header;