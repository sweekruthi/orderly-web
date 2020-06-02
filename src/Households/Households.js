import React, {Component} from 'react';
import './Households.css';
import * as OBJECTS from '../App/ObjectStor';
import HouseholdViewer from "./HouseholdViewer";
import Cookies from "js-cookie";
import Request from "superagent";
import * as URLS from "../App/URLStor";

let UNDEFINED = "";

/**
 * Displays all information related to the households a user is a member of.
 */
class Households extends Component {
    constructor(props) {
        super(props);

        let houses = this.getHouses();
        this.getUsers(houses);

        this.state = {
            houses: houses,
            contentPage: <HouseholdViewer houses={houses} addHouse={this.addHouse} setPage={this.setHousePage}/>,
        };
        this.addHouse = this.addHouse.bind(this);
    }

    getHouses() {
        let houses = [];
        let house = new OBJECTS.House("", "", [], 0, 0);

        let userRequestObject = {
            username: Cookies.get('username')
        };
        Request
            .post(URLS.USER_INFO_URL)
            .send(userRequestObject)
            .then(res => {
                house.id = res.body.household_id;
                house.name = res.body.household_name;
            });
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

        /*houses["1"] = new OBJECTS.House("1", "House 1", [], 4,  1591059947);*/

       return houses;
    }

    getUsers(houses) {
        for (let house in houses) {
            let memberRequestObject = {
                hid: house
            };
            Request
                .post(URLS.HOUSE_MEMBERS_URL)
                .send(memberRequestObject)
                .then(res => {
                    for (let person in res.body.people) {
                        let user = OBJECTS.User(person.pid, person.username, person.first_name, person.last_name, house);
                        houses[house].members.push(user);
                    }
                });
        }
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