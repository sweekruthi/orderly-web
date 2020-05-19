import React, {Component} from 'react';
import {Chore} from "../App/ObjectStore"
import ChoreInfoButton from "./ChoreInfoButton";

/**
 * Displays a list of all the households a user is a member of. As well as a button for adding new households
 */
class HouseholdChoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: [new Chore("1", "vacuum", [], "", 0, 0, []),
                new Chore("2", "dishes", [], "", 0, 0, [])]
        };

        this.createChore = this.createChore.bind(this);
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
    }

    /**
     * Creates a new chore and adds it to the list of chores for the household.
     */
    createChore() {
        /*make api call first to register a new chore with the database, get chore id from api call. create new chore
        * on the front end with id*/
        this.state.chores.push(new Chore("", "", [], "", 0, 0, []));
    }

    /**
     * Toggles a house button between selected and unselected.
     */
    toggleHouseButton(e) {
        document.querySelector('.house-button-selected').classList.remove('house-button-selected');
        e.target.classList.add('house-button-selected');
    };

    render() {
        return (
            <div className="house-list">
                {this.state.chores.map((value) => {
                    return <ChoreInfoButton displayChoreInfo={this.props.displayChoreInfo} id={value.id} chore={value.title}/>})}
                <button className="house-button" onClick={this.goToAddHousehold}>Add Chore</button>
            </div>
        )
    }
}

export default HouseholdChoreList;