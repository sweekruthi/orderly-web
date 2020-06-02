import React, {Component} from 'react';
import Chores from "../Chores/Chores";
import * as URLS from "../App/URLStor"
import ScheduleButtons from "./ScheduleButtons";
import BackArrow from "../Miscellaneous/BackArrow";
import Households from "./Households";
import * as OBJECTS from "../App/ObjectStor";
import Request from "superagent";
import {HOUSE_MEMBERS_URL} from "../App/URLStor";

class HouseSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            chores: {}
        };

        this.goBack = this.goBack.bind(this);
        this.getCurrWeek = this.getCurrWeek.bind(this);
    }

    async componentDidMount() {
        this.setState(
            {
                users: await this.getMembers(),
                chores: await this.getChores()
            }
        )
    }

    goBack() {
        this.props.setPage(<Households/>);
    }

    async getChores() {
        let chores = {};

        let choreRequestObject = {
            hid: this.props.house.id
        };

        await Request
            .post(URLS.HOUSE_FULL_SCH_URL)
            .send(choreRequestObject)
            .then(res => {
                this.props.house.numWeeks = res.body.num_weeks;
                this.props.house.startDate = res.body.start_date;
                for (let i = 0; i < res.body.weeks.length; i++) {
                    let week = res.body.weeks[i];
                    for (let chore in week) {
                        chores[chore.assigned_to] = new OBJECTS.Chore(i + chore.chore_name + "", this.props.house.id, chore.assigned_to,
                            false, i, chore.chore_name, chore.chore_description);
                    }
                }
            })
    }

    async getMembers() {
        let members = [];

        let memberRequestObject = {
            hid: this.props.house.id
        };
        await Request
            .post(HOUSE_MEMBERS_URL)
            .send(memberRequestObject)
            .then(res => {
                for (let member in res.body.people) {
                    members.push(new OBJECTS.User(member.pid, member.username, member.first_name, member.last_name, this.props.house.id));
                }
            });

        return members;
    }

    getCurrWeek(weekStart) {
        let houseWeekStart = new Date(this.props.house.startDate);
        houseWeekStart.setDate(houseWeekStart.getDate() - houseWeekStart.getDay());
        houseWeekStart.setHours(0,0,0,0,);
        return (weekStart.getTime() - houseWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000);
    }

    render() {
        return(
            <div>
                <Chores iconType={'member'} filters={this.state.users} chores={this.state.chores}
                        getCurrWeeks={this.getCurrWeek} backArrow={<BackArrow
                        goBack={this.goBack}/>} scheduleAddOn={<ScheduleButtons house={this.props.house}
                                                                                chores={this.state.chores}
                                                                                setPage={this.props.setPage}/>}/>
            </div>
        )
    }
}

export default HouseSchedule;