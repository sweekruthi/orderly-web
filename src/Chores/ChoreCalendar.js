import React, {Component} from 'react';
import CalendarLine from "./CalendarLine";
import ChoreCalendarBox from "./ChoreCalendarBox";

/**
 * Displays a days worth of chores in a calendar format.
 */
class ChoreCalendar extends Component {
    constructor(props) {
        super(props);
        this.createChoreBoxes = this.createChoreBoxes.bind(this);
    }

    addLines() {
        let lines = [];
        for (let i = 0; i < 10; i++) {
            lines.push(<CalendarLine key={`CalenderLine${i}`}/>);
        }
        return lines;
    }

    createChoreBoxes() {
        let choreBoxes = [];
        let rowIndex = 0;
        let filterIndex = 0;
        for (let filter in this.props.chores) {
            console.log(this.props.currWeekNum)
            let currChores = this.props.chores[filter];
            for (let i = 0; i < currChores.length; i++) {
                let currChore = currChores[i];
                if (this.props.currWeekNum === currChore.weekNum && this.props.rightType(currChore.completed)) {
                    choreBoxes.push(<ChoreCalendarBox choreTitle={currChore.title} row={rowIndex} column={filterIndex}/>);
                    rowIndex++;
                }
            }
            filterIndex++;
        }
        return choreBoxes;
    }

    render() {
        return (
            <div id="chore-calendar">
                {this.createChoreBoxes()}
                {this.addLines()}
            </div>
        );
    }
}

export default ChoreCalendar