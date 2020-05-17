import React, {Component} from 'react';

/**
    A spinner which allows the user to change the month/year of the current date.
 */
class DateForm extends Component {
    constructor(props) {
        super(props);
        this.changeDate = this.changeDate.bind(this);
    }

    /**
     * Changes the current date to match the users input.
     */
    changeDate(e) {
        this.props.changeDate(e.target.value)
    }

    render() {
        return (
            <form>
                <label>{this.props.label}:</label><br/>
                <input id="date-spinner" type="number" max={this.props.max} min={this.props.min}
                       value={this.props.start} onChange={this.changeDate}/>
            </form>
        );
    }
}

export default DateForm;