import React, {Component} from 'react';
import HouseholdChoreList from "./HouseholdChoreList";
import HouseholdChoreDetails from "./HouseholdChoreDetails";

class ScheduleAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChore: "123"
        };

        this.displayChoreInfo = this.displayChoreInfo.bind(this);
    }

    /**
     * Grabs and displays info related to a household.
     */
    displayChoreInfo(id) {
        this.setState(
            {
                selectedChore: id
            }
        )
    }

    render() {
        return(
            <div id="schedule-add">
                <HouseholdChoreList displayChoreInfo={this.displayChoreInfo}/>
                <HouseholdChoreDetails id={this.state.selectedChore}/>
            </div>
        );
    }

}

export default ScheduleAdd