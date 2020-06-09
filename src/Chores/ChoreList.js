import React, {Component} from 'react';
import ChoreListBox from "./ChoreListBox";

/**
 * Displays a days worth of chores in a list format.
 */
class ChoreList extends Component {
    constructor(props) {
        super(props);
        this.createChoreBoxes = this.createChoreBoxes.bind(this);
    }

    createChoreBoxes() {
        console.log(this.props.chores);
        console.log(this.props.selectedIcon);
        let choreBoxes = [];
        let currChores = this.props.chores[this.props.selectedIcon];
        for (let i = 0; i < currChores.length; i++) {
            let currChore = currChores[i];
            if (this.props.currWeekNum === currChore.weekNum && this.props.rightType(currChore.completed)) {
                choreBoxes.push(<ChoreListBox title={currChore.title} description={currChore.description}/>);
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