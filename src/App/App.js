import React from 'react';
import './App.css';
import Login from '../Login/Login';
import { Router } from "@reach/router"
import Home from './Home';
import Cookies from 'js-cookie';

class App extends React.Component{
    constructor(props) {
        super(props);
        Cookies.remove('username');
        Cookies.remove('pid');
    }

    render() {
        return (
            <div className="App">
                <h1 id="heading">Orderly</h1>
                <Router>
                    <Login path="login"/>
                    <Home path="home"/>
                </Router>
            </div>
        );
    }
}
export default App;
