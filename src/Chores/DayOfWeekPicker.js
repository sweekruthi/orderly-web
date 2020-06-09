import React, {Component} from 'react';

import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

/**
    Allows the user to select between different days of the week, also shows week day of the week is currently selected.
 */
class DayOfWeekPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dow: ["S", "M", "T", "W", "Th", "F", "S"],
            dowRefs: [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(),
                React.createRef()]
        };
    }

    /**
     * Select the initial dow button.
     */
    componentDidMount() {
        this.state.dowRefs[this.props.initDay].current.classList.add('dow-selected');
    }

    /**
     * Changes the day of week to reflect a change in date made by some other component.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.initDay !== this.props.initDay) {
            document.querySelector('.dow-selected').classList.remove('dow-selected');
            this.state.dowRefs[this.props.initDay].current.classList.add('dow-selected');
        }
    }

    /**
     * Toggles the selected dow button on and the previously selected button off.
     */
    changeDow = (e, newDay, onClick) => {
        document.querySelector('.dow-selected').classList.remove('dow-selected');
        e.target.classList.add('dow-selected');
        onClick(newDay - this.props.initDay);
    };

    render() {
        return (
            <div>
                <div id="dow-picker">
                    <button className="dow-button-chevron" onClick={() => this.props.onChevronClick(-1)}>
                        <FaChevronLeft className="dow-chevron" size={45}/></button>
                    {this.state.dow.map((value, index) =>
                    {return <button className="dow-button" ref={this.state.dowRefs[index]}>{value}</button>})}
                    <button className="dow-button-chevron" onClick={() => this.props.onChevronClick(1)}>
                        <FaChevronRight className="dow-chevron" size={45}/></button>
                </div>
            </div>
        );
    }
}


export default DayOfWeekPicker