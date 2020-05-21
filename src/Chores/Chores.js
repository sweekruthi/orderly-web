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

        this.getHouses = this.getHouses.bind(this);
        this.getChores = this.getChores.bind(this);

        let houses = this.getHouses();
        let chores = this.getChores(houses);
        let currWeekNums = this.getCurrWeeks(houses, weekStart);
        let initIcon = '';
        for (let house in houses) {
            initIcon = houses[house].id;
            break;
        }

        this.state = {
            schURL: this.props.schURL,
            choreURL: URLS.CHORE_INFO_URL,
            choreView: ENUMS.ChoreView.CALENDAR,
            choreType: ENUMS.ChoreType.UPCOMING,
            chores: chores,
            houses: houses,
            currWeekNums: currWeekNums,
            selectedIcon: initIcon,
            weekStart: weekStart,
            weekEnd: weekEnd,
            inPast: false,
            dow: initDate.getDay(),
            day: initDate.getDate(),
            month: initDate.getMonth(),
            year: initDate.getFullYear(),
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                "October", "November", "December"]
        };

        this.getInitIcon = this.getInitIcon.bind(this);
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

    /******************************************************************************************************************/
    /*                                         Functions for retrieving data from backend                             */
    /******************************************************************************************************************/

    getHouses() {
        /*Make an api call to view_individual_houses.*/
        let house1 = new OBJECTS.House("house_1_id", "house 1", 4, 1589265005000);
        let house2 = new OBJECTS.House("house_2_id", "house 2", 3, 1589956205000);
        let house3 = new OBJECTS.House("house_3_id", "house 3", 1, 1581661805000);

        let houses = {
            "house_1_id" : house1,
            "house_2_id" : house2,
            "house_3_id" : house3
        };

        this.setState(
            {
                houses: houses
            }
        );

        return houses;
    }

    getChores() {
        let chore1 = new OBJECTS.Chore("", "house_1_id", false,1,"Vacuum", "", "", "");
        let chore2 = new OBJECTS.Chore("", "house_1_id", true,3,"Dishes", "", "", "");
        let chore3 = new OBJECTS.Chore("", "house_2_id", false,1,"Clean Bed", "", "", "");
        let chore4 = new OBJECTS.Chore("", "house_3_id", false,0, "Sweep", "", "", "");

        let choreObjs = [chore1, chore2, chore3, chore4];

        let chores = {};

        chores['house_1_id'] = [chore1, chore2];
        chores['house_2_id'] = [chore3];
        chores['house_3_id'] = [chore4];

        /*For each house id make a call to get the houses name, schedule_start,
        * and num weeks.  Calculate the current week the houses schedule is on by finding the difference in weeks between
        * the start date and today's date, and modding by the houses num weeks. Make a call to view_individual_chores, passing
        * in a house_id and num_week. create a new entry in chores with the key equal to the house name and values equal to the
        * chore id's.*/

        this.setState(
            {
                chores: chores
            }
        );

        return chores;
    }

    getCurrWeeks(houses, weekStart) {
        let houseCurrWeekNums = {};

        for (let house in houses) {
            let currHouse = houses[house];
            let houseWeekStart = new Date(currHouse.startDate);
            houseWeekStart.setDate(houseWeekStart.getDate() - houseWeekStart.getDay());
            houseWeekStart.setHours(0,0,0,0,);
            console.log("house: " + houseWeekStart);
            let weekDiff = (weekStart.getTime() - houseWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000);
            houseCurrWeekNums[house] = weekDiff;
        }

        this.setState(
            {
                currWeekNums: houseCurrWeekNums
            }
        );

        return houseCurrWeekNums;
    }

    getInitIcon() {
        let initIcon = '';
        for (let house in this.state.houses) {
            initIcon = this.state.houses[house].id;
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
                currWeekNums: this.getCurrWeeks(this.state.houses, newStart),
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
                    <ChoreDate weekStart={this.state.weekStart} weekEnd={this.state.weekEnd}/>
                    <ChoreTypeButtons initType={this.state.choreType} setChoreType={this.setChoreType}/>
                </div>

                <div id="middle-column">
                    <DayOfWeekPicker initDay={this.state.dow} onDayClick={this.moveDay} onChevronClick={this.moveWeek}/>
                    <ColumnFilter iconType={this.props.iconType} iconObjs={this.state.houses} selectIcon={this.setSelectedIcon}
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