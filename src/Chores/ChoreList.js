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
        for (let house in this.props.chores) {
            let houseChores = this.props.chores[house];
            for (let i = 0; i < houseChores.length; i++) {
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