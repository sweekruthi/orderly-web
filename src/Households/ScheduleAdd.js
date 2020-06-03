import React, {Component} from 'react';
import HouseholdChoreList from "./HouseholdChoreList";
import HouseholdChoreDetails from "./HouseholdChoreDetails";
import * as OBJECTS from "../App/ObjectStor";
import Request from "superagent";
import {GENERATE_SCHEDULE_URL, HOUSE_FULL_SCH_URL, REMOVE_CHORE_URL} from "../App/URLStor";
import {ADD_CHORE_URL} from "../App/URLStor";

let choreID = 2;

class ScheduleAdd extends Component {
    constructor(props) {
        super(props);

        this.unWrapChores = this.unWrapChores.bind(this);
        this.getInitChore = this.getInitChore.bind(this);

        let unWrappedChores = this.unWrapChores();
        let initChore = this.getInitChore(unWrappedChores);
        choreID = Object.keys(unWrappedChores).length;

        this.state = {
            selectedChore: initChore,
            backEndChores: unWrappedChores,
            frontEndChores: unWrappedChores,
            status: []
        };
        this.displayChoreInfo = this.displayChoreInfo.bind(this);
        this.addChore = this.addChore.bind(this);
        this.deleteChore = this.deleteChore.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.generateSchedule = this.generateSchedule.bind(this);
    }

    unWrapChores() {
        let unWrappedChores = {};
        for (let userID in this.props.chores) {
            let userChores = this.props.chores[userID];
            for (let i = 0; i < userChores.length; i++) {
                unWrappedChores[userChores[i].id] = userChores[i];
            }
        }
        return unWrappedChores;
    }

    getInitChore(chores) {
        let initChore = '';
        for (let chore in chores) {
            let currChore = chores[chore];
            initChore = currChore.id;
            break;
        }
        return initChore;
    }

    /**
     * Grabs and displays info related to a household.
     */
    displayChoreInfo(id) {
        this.setState(
            {
                selectedChore: id
            }
        );
    }

    addChore() {
        choreID++;
        let id = choreID + "";
        this.setState(prevState => {
            let frontEndChores = Object.assign({}, prevState.frontEndChores);
            frontEndChores[id] = new OBJECTS.Chore(id, this.props.house.id, "", false, 0, "Chore " + id, "");
            return { frontEndChores };
        });
        this.displayChoreInfo(id);
    }

    async removeFromBackend(id) {
        if (this.state.backEndChores[id] !== undefined) {
            let choreRequestObject = {
                hid: this.props.house.id,
                names: [this.state.backEndChores[id].title],
                descriptions: [this.state.backEndChores[id].description]
            };
            await Request
                .post(REMOVE_CHORE_URL)
                .send(choreRequestObject)
                .then(res => {
                    delete this.state.backEndChores[id];
                });
        }
    }

    async deleteChore(id) {
        await this.removeFromBackend(id);
        delete this.state.frontEndChores[id];
        await this.generateSchedule()
    }

    async saveChanges(id) {
        /*make a call to remove_chore passing in title/desc from backEndChores.  Then make a call to add_chore passing
        * in title/desc from frontEndChores*/
        await this.removeFromBackend(id);

        let addRequestObject = {
            hid: this.props.house.id,
            names: [this.state.frontEndChores[id].title],
            descriptions: [this.state.frontEndChores[id].description]
        };
        await Request
            .post(ADD_CHORE_URL)
            .send(addRequestObject)
            .then(res => {
                this.setState(prevState =>
                    {
                        let backEndChores = Object.assign({}, prevState.backEndChores);
                        let frontEndChores = Object.assign({}, prevState.frontEndChores);
                        backEndChores[id] = frontEndChores[id];
                        return { backEndChores };
                    }
                )
                this.setState(
                    {
                        status: res.body.added_chore_names
                    }
                )
            })
            .catch(err => {
                this.setState(
                    {
                        status: err.message()
                    }
                )
            })

        this.generateSchedule()
    }

    async generateSchedule() {
        let currSchedule = this.getSchedule();
        let numWeeks = 1;
        let startDate = new Date();
        if (currSchedule.numWeeks !== undefined) {
            numWeeks = currSchedule.numWeeks;
        }

        if (currSchedule.startDate !== undefined) {
            startDate = new Date(currSchedule.startDate);
        }

        let scheduleRequestObject = {
            hid: this.props.house.id,
            num_weeks: numWeeks,
            month: startDate.getDate(),
            day: startDate.getMonth(),
            year: startDate.getFullYear()
        }
        await Request
            .post(GENERATE_SCHEDULE_URL)
            .send(scheduleRequestObject)
            .catch(err => {
                this.setState({
                    status: "schedule contains chores with duplicate names"
                })
            })
    }

    async getSchedule() {
        let scheduleRequestObject = {
            hid: this.props.house.id
        }
        Request
            .post(HOUSE_FULL_SCH_URL)
            .send(scheduleRequestObject)
            .then(res => {
                return {
                    numWeeks: res.body.num_weeks,
                    startDate: res.body.start_date
                }
            })
    }

    showDetails() {
        if (Object.keys(this.state.frontEndChores).length === 0) {
            return <div/>
        } else {
            console.log(this.state.frontEndChores[this.state.selectedChore])
            return <HouseholdChoreDetails chore={this.state.frontEndChores[this.state.selectedChore]} saveChanges={this.saveChanges}
                                          deleteChore={this.deleteChore} status={this.state.status}/>
        }
    }

    render() {
        return(
            <div id="schedule-add">
                <HouseholdChoreList chores={this.state.frontEndChores} displayChoreInfo={this.displayChoreInfo}
                                    goBack={this.props.goBack} addChore={this.addChore}/>
                {this.showDetails()}
            </div>
        );
    }

}

export default ScheduleAdd