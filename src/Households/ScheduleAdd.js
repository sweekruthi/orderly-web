import React, {Component} from 'react';
import HouseholdChoreList from "./HouseholdChoreList";
import HouseholdChoreDetails from "./HouseholdChoreDetails";
import * as OBJECTS from "../App/ObjectStor";
import Request from "superagent";
import {GENERATE_SCHEDULE_URL, HOUSE_FULL_SCH_URL, REMOVE_CHORE_URL} from "../App/URLStor";
import {ADD_CHORE_URL} from "../App/URLStor";
import * as URLS from "../App/URLStor";

class ScheduleAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedChore: '',
            backEndChores: {},
            frontEndChores: {},
            choreDetails: <div/>,
            status: []
        };
        this.getChoreList = this.getChoreList.bind(this);
        this.getInitChore = this.getInitChore.bind(this);
        this.displayChoreInfo = this.displayChoreInfo.bind(this);
        this.addChore = this.addChore.bind(this);
        this.deleteChore = this.deleteChore.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.generateSchedule = this.generateSchedule.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.nameIsUnique = this.nameIsUnique.bind(this);
    }

    async componentDidMount() {
        let frontChoreList = await this.getChoreList();
        let backChoreList = await this.getChoreList();
        let initChore = this.getInitChore(frontChoreList);
        console.log(frontChoreList)
        console.log(initChore)
        this.setState(
            {
                selectedChore: initChore,
                backEndChores: backChoreList,
                frontEndChores: frontChoreList
            }
        )
    }

    async getChoreList() {
        let chores = {};

        let choreRequestObject = {
            hid: parseInt(this.props.house.id)
        };
        await Request
            .post(URLS.HOUSE_FULL_SCH_URL)
            .send(choreRequestObject)
            .then(res => {
                if (res.body.weeks.length > 0) {
                    let week = res.body.weeks[0]["week0"];
                    for (let i = 0; i < week.length; i++) {
                        let chore = week[i];
                        chores[i] = new OBJECTS.Chore(i, this.props.house.id, chore.assigned_to,
                            false, 0, chore.chore_name, chore.chore_description);
                    }
                }
                console.log(res.body);
                this.setState(
                    {
                        startDate: Date.parse(res.body.start_date+"T00:00:00"),
                        numWeeks: res.body.numWeeks
                    }
                )
            })
        return chores;
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
        this.setState(prevState =>
            ({
                selectedChore: id,
            })
        );
    }

    addChore() {
        let id = Object.keys(this.state.frontEndChores).length;
        this.setState(prevState => {
            let frontEndChores = Object.assign({}, prevState.frontEndChores);
            let name = "Chore " + (id + 1);
            frontEndChores[id] = new OBJECTS.Chore(id, this.props.house.id, "", false, 0, name, "");
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
        console.log(id);
        await this.removeFromBackend(id);
        delete this.state.frontEndChores[id];
        this.setState(prevState => (
            {
                selectedChore: this.getInitChore(prevState.frontEndChores)
            }
        ));
        await this.generateSchedule();
    }

    async saveChanges(id) {
        /*make a call to remove_chore passing in title/desc from backEndChores.  Then make a call to add_chore passing
        * in title/desc from frontEndChores*/
        console.log("save ran");
        if (this.nameIsUnique(id, this.state.frontEndChores[id].title)) {
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
                    this.setState(prevState => {
                            let backEndChores = Object.assign({}, prevState.backEndChores);
                            let frontEndChores = Object.assign({}, prevState.frontEndChores);
                            backEndChores[id] = frontEndChores[id];
                            return {backEndChores};
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

            await this.generateSchedule();
        }
    }

    nameIsUnique(id, name) {
        for (let i = 0; i < Object.keys(this.state.frontEndChores).length; i++) {
            if (this.state.frontEndChores[i].title === name && id !== i) {
                this.setState(
                    {
                        status: "Error: tried to save duplicate name"
                    }
                )
                return false;
            }
        }
        for (let i = 0; i < Object.keys(this.state.backEndChores).length; i++) {
            if (this.state.frontEndChores[i].title === name && id !== i) {
                this.setState(
                    {
                        status: "Error: tried to save duplicate name"
                    }
                )
                return false;
            }
        }
        return true;
    }

    async generateSchedule() {
        let currSchedule = await this.getSchedule();
        let numWeeks = currSchedule.numWeeks;
        let startDate = new Date(currSchedule.startDate);
        console.log(currSchedule.startDate);

        let scheduleRequestObject = {
            hid: this.props.house.id,
            num_weeks: numWeeks,
            month: startDate.getMonth(),
            day: startDate.getDate(),
            year: startDate.getFullYear()
        }
        await Request
            .post(GENERATE_SCHEDULE_URL)
            .send(scheduleRequestObject)
            .then(res => {
                console.log(res.body);
            })
            .catch(err => {
                this.setState({
                    status: "schedule contains chores with duplicate names"
                })
            })
    }

    async getSchedule() {
        let schedule = {};

        let scheduleRequestObject = {
            hid: this.props.house.id
        }
        await Request
            .post(HOUSE_FULL_SCH_URL)
            .send(scheduleRequestObject)
            .then(res => {
                if (res.error_message === '-') {
                    schedule =  {
                        numWeeks: res.body.num_weeks,
                        startDate: new Date(Date.parse(res.body.start_date+"T00:00:00"))
                    }
                    console.log(res.body.start_date)
                } else {
                    schedule = {
                        numWeeks: 1,
                        startDate: new Date(Date.now())
                    }
                }
                console.log(res.body);
            })

        return schedule;
    }

    handleTitleChange(e) {
        let newTitle = e.target.value;
        this.setState(prevState => {
            let frontEndChores = Object.assign({}, prevState.frontEndChores);
            frontEndChores[this.state.selectedChore].title = newTitle;
            return { frontEndChores };
        });
    }

    handleDescChange(e) {
        let newDesc = e.target.value;
        this.setState(prevState => {
            let frontEndChores = Object.assign({}, prevState.frontEndChores);
            frontEndChores[this.state.selectedChore].description = newDesc;
            return { frontEndChores };
        });
    }

    render() {
        return(
            <div id="schedule-add">
                <HouseholdChoreList chores={this.state.frontEndChores} selectedID={this.state.selectedChore}
                                    displayChoreInfo={this.displayChoreInfo} goBack={this.props.goBack}
                                    addChore={this.addChore}/>
                <HouseholdChoreDetails chore={this.state.frontEndChores[this.state.selectedChore]}
                                       saveChanges={this.saveChanges} handleTitleChange={this.handleTitleChange}
                                       handleDescChange={this.handleDescChange} deleteChore={this.deleteChore}
                                       status={this.state.status} id={this.state.selectedChore}/>
            </div>
        );
    }
}

export default ScheduleAdd