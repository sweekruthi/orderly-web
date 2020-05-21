import React, {Component} from 'react';
import ChoreListBox from "./ChoreListBox";
import ChoreCalendarBox from "./ChoreCalendarBox";

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
            if (this.props.currWeekNums[this.props.selectedIcon] === houseChores[i].weekNum) {
                choreBoxes.push(<ChoreListBox title={houseChores[i].title} supplies={houseChores[i].supplies}
                                              description={houseChores[i].description}/>);
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