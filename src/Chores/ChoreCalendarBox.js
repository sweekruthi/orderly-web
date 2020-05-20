import React, {Component} from 'react';

/**
 * A box for displaying a single chore within the Calendar view.
 */
class ChoreCalendarBox extends Component {
    render() {
        return (
            <div className="calendar-box" style={this.boxPosition()}>
                <div className="calendar-box-title">{this.props.choreTitle}</div>
            </div>
        );
    }

    /**
     * Calculates the box's position based on its start time, duration, and household it belongs to.
     */
    boxPosition() {
        const style = {
            height: "2em",
            width: "9em",
            left: (5.5 + 9 * this.props.column) + "em",
            top: (.7 + 2 * this.props.row) + "em"
        };

        return style;
    }
}

export default ChoreCalendarBox