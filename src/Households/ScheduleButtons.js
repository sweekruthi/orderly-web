import React, {Component} from 'react';
import ScheduleAdd from "./ScheduleAdd";
import ScheduleEdit from "./ScheduleEdit";
import HouseSchedule from "./HouseSchedule";

/**
 * Buttons which allow the user to edit the schedule for a household.
 */
class ScheduleButtons extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.setPage(<HouseSchedule house={this.props.house} setPage={this.props.setPage}/>);
    }

    render() {
        return(
            <div id="schedule-buttons">
                <button id="add-chore" className="chore-button"
                        onClick={() => this.props.setPage(<ScheduleAdd house={this.props.house} chores={this.props.chores}
                                                                       goBack={this.goBack}/>)}>
                    Add Chore</button>
                <button id="edit-chore" className="chore-button" onClick={() => this.props.setPage(<ScheduleEdit house={this.props.house}
                                                                                                                 goBack={this.goBack}/>)}>
                    Generate New Schedule</button>
            </div>
        );
    }
}

export default ScheduleButtons