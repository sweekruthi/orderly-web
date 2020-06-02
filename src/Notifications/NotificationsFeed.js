import React, {Component} from 'react';
import FeedFilter from "./FeedFilter";
import SubmitChoreMessage from "./SubmitChoreMessage";

class NotificationsFeed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="feed">
                {this.props.mgs}
            </div>
        );
    }
}

export default NotificationsFeed;