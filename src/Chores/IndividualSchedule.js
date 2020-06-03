import React, {Component} from 'react';
import Chores from "./Chores";
import * as URLS from "../App/URLStor"
import * as OBJECTS from "../App/ObjectStor";
import Cookies from 'js-cookie';
import Request from 'superagent';

let UNDEFINED = "";

class IndividualSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: {}
        };
        this.getCurrWeeks = this.getCurrWeeks.bind(this);
    }

    async componentDidMount() {
        const choreIds = await this.getChores();
        let choreInfo = {};
        for (let key in choreIds) {
            const id = choreIds[key];
            const chore = await this.getChoreInfo(id);
            choreInfo[key] = chore;
        }
        this.setState({
            chores: choreInfo
        });
    }

    async getChores() {
        /*For each house id make a call to get the houses name, schedule_start,
        * and num weeks.  Calculate the current week the houses schedule is on by finding the difference in weeks between
        * the start date and today's date, and modding by the houses num weeks. Make a call to view_individual_chores, passing
        * in a house_id and num_week. create a new entry in chores with the key equal to the house name and values equal to the
        * chore id's.*/

        let choreIds = [];

        let choreRequestObject = {
            pid: Cookies.get('pid')
        };
        await Request
            .post(URLS.IND_SCH_URL)
            .send(choreRequestObject)
            .then(res => {
                choreIds = res.body.chore_list;

            });

        return choreIds;
    }

    async getChoreInfo(cid) {
        let choreRequestObject = {
            cid: parseInt(cid)
        };
        let chore = {};
        await Request
            .post(URLS.CHORE_INFO_URL)
            .send(choreRequestObject)
            .then(res => {
                chore = new OBJECTS.Chore(res.body.cid, res.body.hid, res.body.assigned_to, res.body.completed,
                    res.body.week_num, res.body.name, res.body.description);
            });
        return chore;
    }

    getCurrWeeks(weekStart) {
        let houseCurrWeeks = {};

        for (let house in this.state.houses) {
            let currHouse = this.state.houses[house];
            let houseWeekStart = new Date(currHouse.startDate);
            houseWeekStart.setDate(houseWeekStart.getDate() - houseWeekStart.getDay());
            houseWeekStart.setHours(0,0,0,0,);
            let weekDiff = (weekStart.getTime() - houseWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000);
            houseCurrWeeks[house] = weekDiff;
        }

        return houseCurrWeeks;
    }


    render() {
        return(
            <div>
                <Chores iconType={'house'} filters={this.state.houses} chores={this.state.chores}
                        getCurrWeeks={this.getCurrWeeks} houseID={this.state.houseID}/>
            </div>
        )
    }
}

export default IndividualSchedule;