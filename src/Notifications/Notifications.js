import React, {Component} from 'react';
import './Notifications.css';
import NotificationsFeed from "./NotificationsFeed";
import NotificationsOptions from "./NotificationsOptions";


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mgs: [],
            mgsInProgress: false
        }
        this.addMessage = this.addMessage.bind(this);
        this.submitChore = this.submitChore.bind(this);
    }

    addMessage(newMessage) {
        this.setState((prevState) => ({
            mgs: this.state.mgs.concat([newMessage]),
            mgsInProgress: true
        }))
    }

    submitChore() {
        this.setState(
            {
                mgsInProgress: false
            }
        )
    }

    render() {
        return (
            <div id='notifications'>
                <NotificationsFeed mgs={this.state.mgs}/>
                <NotificationsOptions addMessage={this.addMessage} mgsInProgress={this.state.mgsInProgress}/>
            </div>
        )
    }
}

export default Notifications;
