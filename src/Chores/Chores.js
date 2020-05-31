import React, {Component} from 'react';
import './Chores.css';
import '../Households/Households.css'
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
import * as OBJECTS from "../App/ObjectStor";
import ChoreViewPage from "./ChoreViewPage";

/**
    Displays all of the chores for a user on a given day.
 */
class Chores extends Component {
    constructor(props) {
        super(props);
        let initDate = new Date();
        let weekStart = new Date();
        let weekEnd = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekEnd.setDate(weekEnd.getDate() + (6 - weekEnd.getDay()));
        initDate.setHours(0,0,0,0);
        weekStart.setHours(0,0,0,0);
        weekEnd.setHours(0,0,0,0);

        this.getInitIcon = this.getInitIcon.bind(this);

        this.state = {
            choreView: ENUMS.ChoreView.CALENDAR,
            choreType: ENUMS.ChoreType.UPCOMING,
            chores: this.props.chores,
            filters: this.props.filters,
            currWeekNums: this.props.getCurrWeeks(weekStart),
            selectedIcon: this.getInitIcon(),
            weekStart: weekStart,
            weekEnd: weekEnd,
            inPast: false,
            dow: initDate.getDay(),
            day: initDate.getDate(),
            month: initDate.getMonth(),
            year: initDate.getFullYear(),
        };

        this.setDay = this.setDay.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setYear = this.setYear.bind(this);
        this.moveDay = this.moveDay.bind(this);
        this.moveWeek = this.moveWeek.bind(this);
        this.moveDate = this.moveDate.bind(this);
        this.setChoreType = this.setChoreType.bind(this);
        this.setChoreView = this.setChoreView.bind(this);
        this.setSelectedIcon = this.setSelectedIcon.bind(this);

    }

    getInitIcon() {
        let initIcon = '';
        for (let filter in this.props.filters) {
            initIcon = this.props.filters[filter].id;
            break;
        }

        return initIcon;
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
        let newStart = new Date(this.state.year, this.state.month, this.state.day);
        let newEnd = new Date(this.state.year, this.state.month, this.state.day);
        newDate.setDate(newDate.getDate() + numMoves * step);
        newStart.setDate((newStart.getDate() + numMoves * step) - newDate.getDay());
        newEnd.setDate((newEnd.getDate() + numMoves * step) + (6 - newDate.getDay()));
        newDate.setHours(0,0,0,0);
        newStart.setHours(0,0,0,0);
        newEnd.setHours(0,0,0,0);

        this.setState(
            {
                dow: newDate.getDay(),
                day: newDate.getDate(),
                month: newDate.getMonth(),
                year: newDate.getFullYear(),
                weekStart: newStart,
                weekEnd: newEnd,
                currWeekNums: this.props.getCurrWeeks(newStart),
                inPast: newEnd <= new Date()
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
        this.setState(
            {
                choreView: view,
                selectedIcon: this.getInitIcon()
            }
        );
    }

    setSelectedIcon(selectedIcon) {
        this.setState(
            {
                selectedIcon: selectedIcon,
            }
        );
    }

    render() {
        return (
            <div id="chores">
                <div id="left-column">
                    {this.props.backArrow}
                    <ChoreDate weekStart={this.state.weekStart} weekEnd={this.state.weekEnd}/>
                    <ChoreTypeButtons initType={this.state.choreType} setChoreType={this.setChoreType}/>
                </div>

                <div id="middle-column">
                    <DayOfWeekPicker initDay={this.state.dow} onDayClick={this.moveDay} onChevronClick={this.moveWeek}/>
                    <ColumnFilter iconType={this.props.iconType} iconObjs={this.state.filters} selectIcon={this.setSelectedIcon}
                                  choreView={this.state.choreView}/>
                    <ChoreViewPage choreView={this.state.choreView} choreType={this.state.choreType}
                                   chores={this.state.chores} selectedIcon={this.state.selectedIcon}
                                   currWeekNums={this.state.currWeekNums} inPast={this.state.inPast}/>
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