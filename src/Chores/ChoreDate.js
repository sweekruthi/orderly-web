import React, {Component} from 'react';

/**
    Displays the current date in plain english
 */
class ChoreDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                "October", "November", "December"]
        }
    }

    render() {
        return (
            <div id="chore-date">
                {this.state.monthNames[this.props.weekStart.getMonth()]} {this.props.weekStart.getDate()}, {this.props.weekStart.getFullYear()}-<br/>
                {this.state.monthNames[this.props.weekEnd.getMonth()]} {this.props.weekEnd.getDate()}, {this.props.weekEnd.getFullYear()}
            </div>
        )
    }
}

export default ChoreDate;