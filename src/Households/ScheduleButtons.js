import React, {Component} from 'react';
import ScheduleEdit from "./ScheduleEdit";
import ScheduleAdd from "./ScheduleAdd";

/**
 * Buttons which allow the user to edit the schedule for a household.
 */
class ScheduleButtons extends Component {
    constructor(props) {
        super(props);
        this.setPage = this.setPage.bind(this);
    }

    setPage(newPage) {
        this.props.setPage(newPage);
    }

    render() {
        return(
            <div id="schedule-buttons">
                <button id="add-chore" className="chore-button" onClick={() => this.setPage(<ScheduleAdd/>)}>
                    Add Chore</button>
                <button id="edit-chore" className="chore-button" onClick={() => this.setPage(<ScheduleEdit/>)}>
                    Edit Schedule</button>
            </div>
        );
    }
}

export default ScheduleButtons