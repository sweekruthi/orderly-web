import React from 'react';
import './App.css';
import Households from "../Households/Households";
import NavBar from "./NavBar";
import Notifications from '../Notifications/Notifications';
import Cookies from 'js-cookie';
import IndividualSchedule from "../Chores/IndividualSchedule";


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
                return <IndividualSchedule/>;
            case "notifications":
                return <Notifications/>;
            default:
                return <div></div>
        }
    }

    render() {
        const accessToken = Cookies.get("username");
        if (!accessToken) {
            window.location.replace('/login');
            return null;
        }
        return (<div className="App">
            {<p>Hi {accessToken}!</p>}
            <NavBar setPage={this.setPage}/>
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
