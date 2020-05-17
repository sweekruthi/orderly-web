import React, {Component} from 'react';
import './Chores.css';
import ChoreDate from "./ChoreDate";
import DateForm from "./DateForm";
import DayOfWeekPicker from "./DayOfWeekPicker";
import ChoreTypeButtons from "./ChoreTypeButtons";
import ChoreViewButtons from "./ChoreViewButtons";
import ColumnFilter from "./ColumnFilter";
import ChoreCalendar from "./ChoreCalendar";
import ChoreList from "./ChoreList";
import * as URLS from "../App/URLStor";
import * as ENUMS from "../App/EnumStor";
import Schedule from "../Households/Schedule";
import ScheduleButtons from "../Households/ScheduleButtons";

/**
    Displays all of the chores for a user on a given day.
 */
class Chores extends Component {

    constructor(props) {
        super(props);
        let initDate = new Date();

        this.state = {
            schURL: this.props.schURL,
            choreURL: URLS.CHORE_INFO_URL,
            choreView: ENUMS.ChoreView.CALENDAR,
            choreType: ENUMS.ChoreType.UPCOMING,
            viewPage: <ChoreCalendar/>,
            dow: initDate.getDay(),
            day: initDate.getDate(),
            month: initDate.getMonth(),
            year: initDate.getFullYear(),
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                "October", "November", "December"]
        };
        
        this.setDay = this.setDay.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setYear = this.setYear.bind(this);
        this.moveDay = this.moveDay.bind(this);
        this.moveWeek = this.moveWeek.bind(this);
        this.moveDate = this.moveDate.bind(this);
        this.setChoreType = this.setChoreType.bind(this);
        this.setChoreView = this.setChoreView.bind(this);
    }

    /******************************************************************************************************************/
    /*                                         Functions for setting the current date                                 */
    /******************************************************************************************************************/

    /**
     * Sets the day of the current date
     * @param day
     */
    setDay(day) {
        let newDate = new Date(this.state.year, this.state.month, this.state.day);
        newDate.setDate(day);
        this.setState(
            {
                dow: newDate.getDay(),
                day: newDate.getDate()
            }
        );
    }

    /**
     * Sets the month of the current date
     * @param month
     */
    setMonth(month) {
        let newDate = new Date(this.state.year, this.state.month, this.state.day);
        newDate.setDate(1);
        newDate.setMonth(month);
        this.setState(
            {
                dow: newDate.getDay(),
                day: newDate.getDate(),
                month: newDate.getMonth()
            }
        );
    }

    /**
     * Sets the year of the current date
     * @param year
     */
    setYear(year) {
        let newDate = new Date(this.state.year, this.state.month, this.state.day);
        newDate.setYear(year);
        this.setState(
            {
                dow: newDate.getDay(),
                year: newDate.getFullYear()
            }
        );
    }

    /******************************************************************************************************************/
    /*             Functions for moving the date forward/backwards a set number of days/weeks/months etc..            */
    /******************************************************************************************************************/

    /**
     * @param numDays Moves the date forwards or backwards by the specified number of days depending on whether
     * numDays is positive or negative.
     */
    moveDay(numDays) {
        this.moveDate(numDays, 1);
    }

    /**
     * @param numWeeks Moves the date forwards or backwards by the specified number of weeks depending on whether
     * numDays is positive or negative.
     */
    moveWeek(numWeeks) {
        this.moveDate(numWeeks, 7);
    }

    moveDate(numMoves, step) {
        let newDate = new Date(this.state.year, this.state.month, this.state.day);
        newDate.setDate(newDate.getDate() + numMoves * step);
        this.setState(
            {
                dow: newDate.getDay(),
                day: newDate.getDate(),
                month: newDate.getMonth(),
                year: newDate.getFullYear()
            }
        );
    }

    /******************************************************************************************************************/
    /*        Functions for setting the type of chores to be displayed, and the view in which to display them         */
    /******************************************************************************************************************/

    setChoreType(type) {
        this.setState(
            {
                choreType: type
            }
        );
    }

    setChoreView(view) {
        let viewPage = <ChoreCalendar/>;
        if (view === ENUMS.ChoreView.LIST) {
            viewPage = <ChoreList/>
        }
        this.setState(
            {
                choreView: view,
                viewPage: viewPage
            }
        );
    }

    render() {
        return (
            <div id="chores">
                <div id="left-column">
                    <ChoreDate day={this.state.day} month={this.state.monthNames[this.state.month]} year={this.state.year}/>
                    <DateForm label="Month" changeDate={(m) => this.setMonth(m-1)} start={this.state.month + 1} max="12" min="1"/>
                    <DateForm label="Year" changeDate={(y) => this.setYear(y)} start={this.state.year} max="10000" min="1"/>
                    <ChoreTypeButtons initType={this.state.choreType} setChoreType={this.setChoreType}/>
                </div>

                <div id="middle-column">
                    <DayOfWeekPicker initDay={this.state.dow} onDayClick={this.moveDay} onChevronClick={this.moveWeek}/>
                    <ColumnFilter columnIcon={this.props.columnIcon} columnStart={this.props.columnStart}
                                  choreView={this.state.choreView}/>
                    {this.state.viewPage}
                </div>

                <div id="right-column">
                    <ChoreViewButtons initView={this.state.choreView} setChoreView={this.setChoreView}/>
                    {this.props.scheduleAddOn}
                </div>
            </div>
        );
    }
}

export default Chores;