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
            numWeeks: ""
        }
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this);
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

    async submitSchedule() {
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

        this.props.goBack()
    }

    render() {
        return(
            <div id="add-house">
                <div className="add-filler"/>
                <BackArrow goBack={this.props.goBack}/>
                <div className="house-details">
                    <div id="house-details-members-title">Starting Week</div>
                    <div id="schedule-start-forms">
                        <input className="schedule-start-form" type="text" onChange={this.handleDayChange}
                               value={this.state.startingDay} placeholder='MM'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form"  type="text" onChange={this.handleMonthChange}
                               value={this.state.startingMonth} placeholder='DD'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form" style={{width: '3em'}} type="text" onChange={this.handleYearChange}
                               value={this.state.startingYear} placeholder='YYYY'/>
                    </div>
                    <hr className="house-details-linebreak"/>
                    <div id="house-details-members-title">Length</div>
                    <input className="schedule-length-form" type='text' onChange={this.handleWeekChange}
                           value={this.state.number} placeholder='# Weeks'/>
                    <button id="edit-schedule-save" onClick={this.submitSchedule}>Generate Schedule</button>
                </div>
            </div>
        );
    }
}

export default ScheduleEdit