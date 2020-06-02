import React, {Component} from 'react';
import './Households.css';
import * as OBJECTS from '../App/ObjectStor';
import HouseholdViewer from "./HouseholdViewer";
import Cookies from "js-cookie";
import Request from "superagent";
import * as URLS from "../App/URLStor";

let UNDEFINED = "-";

/**
 * Displays all information related to the households a user is a member of.
 */
class Households extends Component {
    constructor(props) {
        super(props);

        this.state = {
            houses: {},
            contentPage: <div/>,
            memberLength: 0
        };
        this.addHouse = this.addHouse.bind(this);
    }

    async componentDidMount() {
        let houses = await this.getHouses();
        houses = await this.getHouseScheduleInfo(houses);
        houses = await this.getUsers(houses);
        this.setState(
            {
                houses: houses,
                contentPage: <HouseholdViewer houses={houses} addHouse={this.addHouse}
                                              setPage={this.setHousePage} memberLength={this.state.memberLength}/>
            }
        )
    }

    async getHouses() {
        let houses = {};
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
                    houses[house.id] = house;
                }
            });

        return houses;
    }

    async getHouseScheduleInfo(houses) {
        for (let house in houses) {
            let houseRequestObject = {
                hid: parseInt(house.id)
            };
            await Request
                .post(URLS.HOUSE_FULL_SCH_URL)
                .send(houseRequestObject)
                .then(res => {
                    if (res.body.error_message === UNDEFINED) {
                        house.weekNum = parseInt(res.body.num_weeks);
                        house.startDate = parseInt(res.body.start_date);
                    }
                });
        }

        return houses;
    }

    async getUsers(houses) {
        for (let house in houses) {
            let memberRequestObject = {
                hid: parseInt(house.id)
            };
            await Request
                .post(URLS.HOUSE_MEMBERS_URL)
                .send(memberRequestObject)
                .then(res => {
                    for (let i = 0; i < res.body.people.length; i++) {
                        let person = res.body.people[i];
                        let user = new OBJECTS.User(person.pid, person.username, person.first_name, person.last_name, house.id);
                        houses[house.id].members.push(user);
                    }
                    this.setState(
                        {
                            memberLength: res.body.people.length
                        }
                    )
                });
        }

        return houses;
    }

    addHouse = (houseInfo) => {
        this.setState(prevState => {
            let houses = Object.assign({}, prevState.houses);
            houses[houseInfo.id] = houseInfo;
            return { houses };
        });
    };


    /**
     * Sets the content page for households. Used for switching to the add house page,
     * or the schedule/preferences page.
     *
     * @param newPage the new content page to display
     */
    setHousePage = (newPage) => {
        this.setState(
            {
                contentPage: newPage
            }
        );
    };

    render() {
        return (
            <div>
                {this.state.contentPage}
            </div>
        )
    }
}

export default Households;