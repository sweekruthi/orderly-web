import React, {Component} from 'react';
import OptionButton from "./OptionButton";
import SubmitChoreMessage from "./SubmitChoreMessage";

class NotificationsOptions extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(e) {
        let prevSelected = document.querySelector('.option-button-selected');
        e.target.classList.toggle('option-button-selected');
        if (prevSelected !== null) {
            prevSelected.classList.remove('option-button-selected');
        }
    }

    render() {
        return(
          <div id="options">
              <OptionButton title='Submit Chore' onClick={this.selectOption} mgsInProgress={this.props.mgsInProgress}
                            addMessage={() => this.props.addMessage(<SubmitChoreMessage submit={this.props.submit}/>)}/>
              <OptionButton title='Trade Chore' onClick={this.selectOption} mgsInProgress={this.props.mgsInProgress}
                            addMessage={() => this.props.addMessage(<SubmitChoreMessage submit={this.props.submit}/>)}/>
          </div>
        );
    }
}

export default NotificationsOptions;