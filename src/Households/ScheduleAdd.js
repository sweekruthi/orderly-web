import React, {Component} from 'react';
import HouseholdChoreList from "./HouseholdChoreList";
import HouseholdChoreDetails from "./HouseholdChoreDetails";
import * as OBJECTS from "../App/ObjectStor";
import Request from "superagent";
import {REMOVE_CHORE_URL} from "../App/URLStor";
import {ADD_CHORE_URL} from "../App/URLStor";

let choreID = 1;

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
            frontEndChores: unWrappedChores
        };
        this.displayChoreInfo = this.displayChoreInfo.bind(this);
        this.addChore = this.addChore.bind(this);
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
            initChore = chore;
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
            frontEndChores[id] = new OBJECTS.Chore(id, "", "", false, 0, "Chore " + id, "");
            return { frontEndChores };
        });
    }

    deleteChore(id) {
        if (this.state.backEndChores[id] !== undefined) {
            let choreRequestObject = {
                hid: this.props.house.id,
                names: [this.state.backEndChores[id].title],
                descriptions: [this.state.backEndChores[id].description]
            };
            Request
                .post(REMOVE_CHORE_URL)
                .send(choreRequestObject)
                .then(res => {
                    delete this.state.backEndChores[id];
                });
        }
        delete this.state.frontEndChores[id];
    }

    saveChanges(id) {
        /*make a call to remove_chore passing in title/desc from backEndChores.  Then make a call to add_chore passing
        * in title/desc from frontEndChores*/
        let removeRequestObject = {
            hid: this.props.house.id,
            names: [this.state.backEndChores[id].title],
            descriptions: [this.state.backEndChores[id].description]
        };
        Request
            .post(REMOVE_CHORE_URL)
            .send(removeRequestObject)
            .then (res => {
                delete this.state.backEndChores[id];
                let addRequestObject = {
                    hid: this.props.house.id,
                    names: [this.state.frontEndChores[id].title],
                    descriptions: [this.state.frontEndChores[id].description]
                };
                Request
                    .post(ADD_CHORE_URL)
                    .send(addRequestObject)
                    .then(res => {
                       this.state.backEndChores[id] = this.state.frontEndChores[id];
                    });
            });
    }

    render() {
        return(
            <div id="schedule-add">
                <HouseholdChoreList chores={this.state.frontEndChores} displayChoreInfo={this.displayChoreInfo}
                                    goBack={this.props.goBack} addChore={this.addChore}/>
                <HouseholdChoreDetails chore={this.state.frontEndChores[this.state.selectedChore]} saveChanges={this.saveChanges}
                                        deleteChore={this.deleteChore}/>
            </div>
        );
    }

}

export default ScheduleAdd