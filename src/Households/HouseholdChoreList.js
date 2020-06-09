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
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
        this.createInfoButtons = this.createInfoButtons.bind(this);
    }

    componentDidMount() {
        if (Object.keys(this.props.chores).length !== 0) {
            document.querySelector('.house-button').classList.add('house-button-selected');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedID !== this.props.selectedID) {
            this.switchToNewChore(this.props.selectedID)
        }
    }

    switchToNewChore(id) {
        let prevSelected = document.querySelector('.house-button-selected');
        if (prevSelected !== null) {
            prevSelected.classList.remove('house-button-selected');
        }
        if (id !== '') {
            document.getElementById(id).classList.add('house-button-selected');
        }
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
            infoButtons.push(<ChoreInfoButton id={currChore.id} displayChoreInfo={this.props.displayChoreInfo}
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