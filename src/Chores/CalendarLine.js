import React from 'react';

const lineStyle = {
    position: "relative",
    height: "1em",
    marginBottom: "1em"
};

/**
 * Returns A single line found within the ChoreCalendar view. Contains a time given on the left hand side, followed
 * by a horizontal line.
 */
function CalendarLine(props) {
    return (
        <div style={lineStyle}>
            <div className="calendar-time">{props.time}</div>
            <hr className="calendar-line"/>
        </div>
    );
}

export default CalendarLine