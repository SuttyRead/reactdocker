import React, {Component} from 'react';
import './App.css';
import Header from "./components/header";
import {Router, Route, Switch} from "react-router-dom"
import Edit from "./components/edit";
import Add from "./components/add";
import Registration from "./components/registration";
import Login from "./components/login";
import Main from "./components/main";
import history from './utils/history';
import HomePage from "./components/homePage";


class App extends Component {

    render() {
        return (
            <Router history={history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/edit/:id" component={Edit}/>
                        <Route path="/add" component={Add}/>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/" component={Main} exact/>
                        <Route render={() => <h2>Page not found</h2>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
