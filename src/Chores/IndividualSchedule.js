import React, {Component} from 'react';
import Chores from "../Chores/Chores";
import * as URLS from "../App/URLStor"
import * as OBJECTS from "../App/ObjectStor";
import Cookies from 'js-cookie';
import Request from 'superagent';

let UNDEFINED = "";

class IndividualSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: this.getHouses()
        };
        this.getCurrWeeks = this.getCurrWeeks.bind(this);
    }

    getHouses() {
        let houses = {};
        let house = new OBJECTS.House("", "", [], 0, 0);

        let userRequestObject = {
            username: Cookies.get('username')
        };
        Request
            .post(URLS.USER_INFO_URL)
            .send(userRequestObject)
            .then(res => {
                house.id = res.body.household_id;
                house.title = res.body.household_name;
            });

        this.setState(
            {
                houseID: house.id
            }
        );
        if (house.id !== UNDEFINED) {
            let houseRequestObject = {
                hid: parseInt(house.id)
            };
            Request
                .post(URLS.HOUSE_FULL_SCH_URL)
                .send(houseRequestObject)
                .then(res => {
                    if (res.body.error_message === UNDEFINED) {
                        house.weekNum = parseInt(res.body.num_weeks);
                        house.startDate = parseInt(res.body.start_date);
                    }
                });

            houses[house.id] = house;
        }

        return houses;
    }

    getChores() {
        /*For each house id make a call to get the houses name, schedule_start,
        * and num weeks.  Calculate the current week the houses schedule is on by finding the difference in weeks between
        * the start date and today's date, and modding by the houses num weeks. Make a call to view_individual_chores, passing
        * in a house_id and num_week. create a new entry in chores with the key equal to the house name and values equal to the
        * chore id's.*/

        let chores = {};

        for (let house in this.state.houses) {
            let choreRequestObject = {
                pid: Cookies.get('pid')
            };
            Request
                .post(URLS.IND_SCH_URL)
                .send(choreRequestObject)
                .then(res => {
                    let choreList = res.body.chore_list;
                    for (let choreID in choreList) {
                        chores[choreID] = this.getChoreInfo(choreID);
                    }
                });
        }

        return chores;
    }

    getChoreInfo(cid) {
        let choreRequestObject = {
            cid: parseInt(cid)
        };
        Request
            .post(URLS.CHORE_INFO_URL)
            .send(choreRequestObject)
            .then(res => {
                return new OBJECTS.Chore(res.body.cid, res.body.hid, res.body.assigned_to, res.body.completed,
                    res.body.week_num, res.body.name, res.body.description);
            });
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
                <Chores iconType={'house'} filters={this.state.houses} chores={this.getChores()}
                        getCurrWeeks={this.getCurrWeeks} houseID={this.state.houseID}/>
            </div>
        )
    }
}

export default IndividualSchedule;