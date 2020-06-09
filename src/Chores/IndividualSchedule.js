import React, {Component} from 'react';
import Chores from "./Chores";
import * as URLS from "../App/URLStor"
import * as OBJECTS from "../App/ObjectStor";
import Cookies from 'js-cookie';
import Request from 'superagent';

let UNDEFINED = "-";

class IndividualSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: {},
            houses: [new OBJECTS.House(0, "", [], 0, 0)],
            currWeekNum: 0
        };
        this.setCurrWeek = this.setCurrWeek.bind(this);
    }

    async componentDidMount() {
        const choreIds = await this.getChores();
        let choreInfo = [];
        for (let key in choreIds) {
            const id = choreIds[key];
            const chore = await this.getChoreInfo(id);
            choreInfo.push(chore);
        }
        const houses = await this.getHouses()
        const chores = {};
        chores[houses[0].id] = choreInfo;
        console.log(this.getInitCurrWeek(houses));
        this.setState({
            chores: chores,
            houses: houses,
            currWeekNum: this.getInitCurrWeek(houses),
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
                console.log(res.body);
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

    async getHouses() {
        let houses = [];
        let house = new OBJECTS.House("-", "-", [], 0, 0);

        let userRequestObject = {
            username: Cookies.get('username')
        };
        await Request
            .post(URLS.USER_INFO_URL)
            .send(userRequestObject)
            .then(res => {
                if (res.body.household_id !== UNDEFINED) {
                    house.id = res.body.household_id;
                    house.title = res.body.household_name;
                    houses.push(house);
                }
            });


        return await this.getHouseScheduleInfo(houses);
    }

    async getHouseScheduleInfo(houses) {
        for (let i = 0; i < houses.length; i++) {
            let house = houses[i];
            let houseRequestObject = {
                hid: parseInt(house.id)
            };
            await Request
                .post(URLS.HOUSE_FULL_SCH_URL)
                .send(houseRequestObject)
                .then(res => {
                    if (res.body.error_message === UNDEFINED) {
                        house.weekNum = parseInt(res.body.num_weeks);
                        house.startDate = Date.parse(res.body.start_date+"T00:00:00");
                    }
                    console.log(res.body);
                });
        }
        return houses;
    }

    getInitCurrWeek(houses) {
        let weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0,0,0,0);
        return this.setCurrWeek(weekStart, houses);
    }

    setCurrWeek(weekStart, houses) {
        let houseCurrWeek = 0;
        let houseWeekStart = new Date(houses[0].startDate);
        houseWeekStart.setDate(houseWeekStart.getDate() - houseWeekStart.getDay());
        houseWeekStart.setHours(0,0,0,0,);
        let weekDiff = (weekStart.getTime() - houseWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000);
        this.setState(
            {
                currWeekNum: weekDiff
            }
        )

        return weekDiff
    }


    render() {
        return(
            <div>
                <Chores iconType={'house'} filters={this.state.houses} chores={this.state.chores}
                        currWeekNum={this.state.currWeekNum} setCurrWeek={this.setCurrWeek}/>
            </div>
        )
    }
}

export default IndividualSchedule;