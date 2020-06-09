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
            chores: {},
            startDate: 100000,
            currWeekNum: 0,
            numWeeks: 0
        };

        this.goBack = this.goBack.bind(this);
        this.setCurrWeek = this.setCurrWeek.bind(this);
    }

    async componentDidMount() {
        this.setState(
            {
                users: await this.getMembers(),
                chores: await this.getChores(),
                currWeekNum: this.getInitCurrWeek()
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

        let startDate = 0;
        let numWeeks = 0;

        await Request
            .post(URLS.HOUSE_FULL_SCH_URL)
            .send(choreRequestObject)
            .then(res => {
                for (let i = 0; i < res.body.weeks.length; i++) {
                    let week = res.body.weeks[i]["week" + i];
                    for (let j = 0; j < week.length; j++) {
                        let chore = week[j];
                        if (chores[chore.assigned_to] === undefined) {
                            chores[chore.assigned_to] = [];
                        }
                        chores[chore.assigned_to].push(new OBJECTS.Chore(chore.chore_name, this.props.house.id, chore.assigned_to,
                            false, i, chore.chore_name, chore.chore_description));
                    }
                    startDate = res.body.start_date+"T00:00:00";
                    numWeeks = res.body.num_weeks;
                }
                console.log(res.body)
            });
        console.log(chores);
        await this.setState(
            {
                startDate: Date.parse(startDate),
                numWeeks: numWeeks
            }
        )
        return chores;
    }

    async getMembers() {
        let members = [];
        let memberRequestObject = {
            hid: parseInt(this.props.house.id)
        };
        await Request
            .post(HOUSE_MEMBERS_URL)
            .send(memberRequestObject)
            .then(res => {
                for (let i = 0; i < res.body.people.length; i++) {
                    let member = res.body.people[i];
                    members.push(new OBJECTS.User(member.pid, member.username, member.first_name, member.last_name, this.props.house.id));
                }
            });
        return members;
    }

    getInitCurrWeek() {
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0,0,0,0);
        return this.setCurrWeek(weekStart, []);
    }

    setCurrWeek(weekStart, filters) {
        let houseWeekStart = new Date(this.state.startDate);
        houseWeekStart.setDate(houseWeekStart.getDate() - houseWeekStart.getDay());
        houseWeekStart.setHours(0,0,0,0,);
        let currWeek = (weekStart.getTime() - houseWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000);
        this.setState(
            {
                currWeekNum: currWeek
            }
        )
        return currWeek;
    }

    render() {
        return(
            <div>
                <Chores iconType={'member'} filters={this.state.users} chores={this.state.chores}
                        currWeekNum={this.state.currWeekNum} setCurrWeek={this.setCurrWeek} backArrow={<BackArrow
                        goBack={this.goBack}/>} scheduleAddOn={<ScheduleButtons house={this.props.house}
                                                                                chores={this.state.chores}
                                                                                setPage={this.props.setPage}/>}/>
            </div>
        )
    }
}

export default HouseSchedule;