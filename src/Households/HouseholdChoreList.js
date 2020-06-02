import React, {Component} from 'react';
import ChoreInfoButton from "./ChoreInfoButton";
import BackArrow from "../Miscellaneous/BackArrow";

/**
 * Displays a list of all the households a user is a member of. As well as a button for adding new households
 */
class HouseholdChoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choreButtons: this.createInfoButtons()
        };
        this.createChore = this.createChore.bind(this);
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
        this.createInfoButtons = this.createInfoButtons.bind(this);
    }

    componentDidMount() {
        document.querySelector('.house-button').classList.add('house-button-selected');
    }

    /**
     * Creates a new chore and adds it to the list of chores for the household.
     */
    createChore() {
        /*make api call first to register a new chore with the database, get chore id from api call. create new chore
        * on the front end with id*/

    }

    /**
     * Toggles a house button between selected and unselected.
     */
    toggleHouseButton(e) {
        document.querySelector('.house-button-selected').classList.remove('house-button-selected');
        e.target.classList.add('house-button-selected');
    };

    createInfoButtons() {
        let infoButtons = [];

        for (let chore in this.props.chores) {
            let currChore = this.props.chores[chore];
            infoButtons.push(<ChoreInfoButton displayChoreInfo={this.props.displayChoreInfo}
                                              toggleButton={this.toggleHouseButton} chore={currChore}/>);
        }

        return infoButtons;
    }

    render() {
        return (
            <div style={{flexBasis: '33%'}}>
                <BackArrow goBack={this.props.goBack}/>
                <div className="house-list">
                    {this.createInfoButtons()}
                    <button className="house-button" onClick={this.props.addChore}>Add Chore</button>
                </div>
            </div>
        )
    }
}

export default HouseholdChoreList;