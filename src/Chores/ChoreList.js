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
        let choreBoxes = [];
        if (this.props.chores) {
            for (const key in this.props.chores) {
                let currChore = this.props.chores[key];
                if (this.props.currWeekNums === currChore.weekNum) {
                    choreBoxes.push(<ChoreListBox title={currChore.title} description={currChore.description}/>);
                }
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