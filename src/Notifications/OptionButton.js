import React, {Component} from 'react';
import SubmitChoreMessage from "./SubmitChoreMessage";

class OptionButton extends Component {
    constructor(props) {
        super(props);
        this.createNewMessage = this.createNewMessage.bind(this);
    }

    createNewMessage(e) {
        if (!this.props.mgsInProgress) {
            this.props.onClick(e);
            this.props.addMessage();
        }
    }

    render() {
        return (
            <button className="option-button" onClick={this.createNewMessage}>
                {this.props.title}
            </button>
        );
    }
}

export default OptionButton;