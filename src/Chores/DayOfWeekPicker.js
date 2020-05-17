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

        };
        this.sundayRef = React.createRef();
        this.mondayRef = React.createRef();
        this.tuesdayRef = React.createRef();
        this.wednesdayRef = React.createRef();
        this.thursdayRef = React.createRef();
        this.fridayRef = React.createRef();
        this.saturdayRef = React.createRef();
    }

    /**
     * Select the initial dow button.
     */
    componentDidMount() {
        let dowArr = [this.sundayRef, this.mondayRef, this.tuesdayRef, this.wednesdayRef, this.thursdayRef,
            this.fridayRef, this.saturdayRef];
        dowArr[this.props.initDay].current.classList.add('dow-selected');
    }

    /**
     * Changes the day of week to reflect a change in date made by some other component.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.initDay !== this.props.initDay) {
            let dowArr = [this.sundayRef, this.mondayRef, this.tuesdayRef, this.wednesdayRef, this.thursdayRef,
                this.fridayRef, this.saturdayRef];
            document.querySelector('.dow-selected').classList.remove('dow-selected');
            dowArr[this.props.initDay].current.classList.add('dow-selected');
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
                <ul id="dow-picker">
                    <button className="dow-button" onClick={() => this.props.onChevronClick(-1)}>
                        <FaChevronLeft className="dow-chevron" size={45}/></button>
                    <button className="dow-button" ref={this.sundayRef} onClick={(e) =>
                        this.changeDow(e, 0, this.props.onDayClick)}>S</button>
                    <button className="dow-button" ref={this.mondayRef} onClick={(e) =>
                        this.changeDow(e, 1, this.props.onDayClick)}>M</button>
                    <button className="dow-button" ref={this.tuesdayRef} onClick={(e) =>
                        this.changeDow(e, 2, this.props.onDayClick)}>T</button>
                    <button className="dow-button" ref={this.wednesdayRef} onClick={(e) =>
                        this.changeDow(e, 3, this.props.onDayClick)}>W</button>
                    <button className="dow-button" ref={this.thursdayRef} onClick={(e) =>
                        this.changeDow(e, 4, this.props.onDayClick)}>Th</button>
                    <button className="dow-button" ref={this.fridayRef} onClick={(e) =>
                        this.changeDow(e, 5, this.props.onDayClick)}>F</button>
                    <button className="dow-button" ref={this.saturdayRef} onClick={(e) =>
                        this.changeDow(e, 6, this.props.onDayClick)}>S</button>
                    <button className="dow-button" onClick={() => this.props.onChevronClick(1)}>
                        <FaChevronRight className="dow-chevron" size={45}/></button>
                </ul>
            </div>
        );
    }
}


export default DayOfWeekPicker