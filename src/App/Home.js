import React from 'react';
import './App.css';
import * as URLS from "../App/URLStor"
import Households from "../Households/Households";
import NavBar from "./NavBar";
import Notifications from '../Notifications/Notifications';
import { Redirect } from '@reach/router/lib/history';
import Cookies from 'js-cookie';
import Chores from '../Chores/Chores';
import { access } from 'fs';
import { navigate } from '@reach/router';
import { FaHome } from 'react-icons/fa';
import HouseIcon from "../Households/HouseIcon";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.setPage = this.setPage.bind(this);
        this.state = {
            page: "households",
            user: ""
        }
    }

    componentDidMount() {
        const accessToken = Cookies.get('access_token');
        this.setState({
            user: accessToken
        });
    }

    currTab() {
        switch (this.state.page) {
            case "households":
                return <Households/>;
            case "chores":
                return <Chores schURL={URLS.IND_SCH_URL} columnIcon={<HouseIcon iconSize={40} nameSize="14pt"/>} columnStart={8}/>;
            case "notifications":
                return <Notifications />;
            default:
                return <div></div>
        }
    }

    render() {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            window.location.replace('/login');
            return null;
        }
        return (<div className="App">
            {/*<p>Hi {this.state.user}!</p>*/}
            <NavBar setPage={this.setPage} />
            {this.currTab()}
        </div>);
    }

    setPage(currPage) {
        this.setState({
            page: currPage
        });
    }

}
export default Home;
