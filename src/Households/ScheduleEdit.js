import React, {Component} from 'react';
import BackArrow from "../Miscellaneous/BackArrow";
import Request from "superagent";
import {GENERATE_SCHEDULE_URL} from "../App/URLStor";

class ScheduleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startingDay: "",
            startingMonth: "",
            startingYear: "",
            numWeeks: "",
            status: ""
        }
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.submitSchedule = this.submitSchedule.bind(this);
    }

    handleDayChange(e) {
        this.setState(
            {
                startingDay: e.target.value
            }
        )
    }

    handleMonthChange(e) {
        this.setState(
            {
                startingMonth: e.target.value
            }
        )
    }

    handleYearChange(e) {
        this.setState(
            {
                startingYear: e.target.value
            }
        )
    }

    handleWeekChange(e) {
        this.setState(
            {
                numWeeks: e.target.value
            }
        )
    }

    setStatus(newStatus) {
        this.setState(
            {
                status: newStatus
            }
        )
    }

    async submitSchedule() {
        if (this.validateStartDate()) {
            let scheduleRequestObject = {
                hid: parseInt(this.props.house.id),
                num_weeks: parseInt(this.state.numWeeks),
                month: parseInt(this.state.startingMonth),
                day: parseInt(this.state.startingDay),
                year: parseInt(this.state.startingYear)
            }
            await Request
                .post(GENERATE_SCHEDULE_URL)
                .send(scheduleRequestObject)

            console.log(parseInt(this.state.startingMonth));
            console.log(parseInt(this.state.startingDay));
            console.log(parseInt(this.state.startingYear));

            this.props.goBack()
        }
    }

    validateStartDate() {
        let numWeeks = parseInt(this.state.numWeeks);
        let startDay = parseInt(this.state.startingDay);
        let startMonth = parseInt(this.state.startingMonth);
        let startYear = parseInt(this.state.startingYear);

        if (isNaN(numWeeks)) {
            this.setStatus("Schedule length is not a number")
            return false;
        } else if(numWeeks <= 0) {
            this.setStatus("Schedule length must be greater than 0")
            return false;
        } else if (isNaN(startDay)) {
            this.setStatus("Starting Day is not a number")
            return false;
        } else if (isNaN(startMonth)) {
            this.setStatus("Starting Month is not a number")
            return false;
        } else if (isNaN(startYear)) {
            this.setStatus("Starting Year is not a number")
            return false;
        } else if (this.state.startingDay.length !== 2) {
            this.setStatus("Starting Day must be two digits.  If the day is one digit, then add a leading zero.")
            return false;
        } else if (this.state.startingMonth.length !== 2) {
            this.setStatus("Starting Month must be two digits.  If the Month is one digit, then add a leading zero.")
            return false;
        } else if (this.state.startingYear.length !== 4) {
            this.setStatus("Starting Year must be four digits.")
            return false;
        }

        this.setStatus("");
        return true;
    }

    render() {
        return(
            <div id="add-house">
                <div className="add-filler"/>
                <BackArrow goBack={this.props.goBack}/>
                <div className="house-details">
                    <div id="house-details-members-title">Starting Week</div>
                    <div id="schedule-start-forms">
                        <input className="schedule-start-form" type="text" onChange={this.handleMonthChange}
                               value={this.state.startingMonth} placeholder='MM'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form"  type="text" onChange={this.handleDayChange}
                               value={this.state.startingDay} placeholder='DD'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form" style={{width: '3em'}} type="text" onChange={this.handleYearChange}
                               value={this.state.startingYear} placeholder='YYYY'/>
                    </div>
                    <hr className="house-details-linebreak"/>
                    <div id="house-details-members-title">Length</div>
                    <input className="schedule-length-form" type='text' onChange={this.handleWeekChange}
                           value={this.state.number} placeholder='# Weeks'/>
                           <div>{this.state.status}</div>
                    <button id="edit-schedule-save" onClick={this.submitSchedule}>Generate Schedule</button>
                </div>
            </div>
        );
    }
}

export default ScheduleEdit