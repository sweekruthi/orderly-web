import React, {Component} from 'react';
import ChoreListBox from "./ChoreListBox";
import ChoreCalendarBox from "./ChoreCalendarBox";
import * as ENUMS from "../App/EnumStor";

/**
 * Displays a days worth of chores in a list format.
 */
class ChoreList extends Component {
    constructor(props) {
        super(props);
        this.createChoreBoxes = this.createChoreBoxes.bind(this);
    }

    createChoreBoxes() {
        let choreBoxes = [];
        let houseChores = this.props.chores[this.props.selectedIcon];
        for (let i = 0; i < houseChores.length; i++) {
            let currChore = houseChores[i];
            if (this.props.currWeekNums[this.props.selectedIcon] === currChore.weekNum && this.props.rightType(currChore.completed)) {
                choreBoxes.push(<ChoreListBox title={currChore.title} supplies={currChore.supplies}
                                              description={currChore.description}/>);
            }
        }

        return choreBoxes;
    }

    render() {
        return(
            <div id="chore-list">
                {this.createChoreBoxes()}
            </div>
        )
    }
}

export default ChoreList