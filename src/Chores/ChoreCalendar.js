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
            lines.push(<CalendarLine/>);
        }
        return lines;
    }

    createChoreBoxes() {
        let choreBoxes = [];
        let houseIndex = 0;
        for (let house in this.props.chores) {
            let houseChores = this.props.chores[house];
            for (let i = 0; i < houseChores.length; i++) {
                if (this.props.currWeekNums[house] === houseChores[i].weekNum) {
                    choreBoxes.push(<ChoreCalendarBox choreTitle={houseChores[i].title} row={i} column={houseIndex}/>);
                }
            }
            houseIndex++;
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