import React, {Component} from 'react';
import AddHousehold from "./AddHousehold";

/**
 * Displays a list of all the households a user is a member of. As well as a button for adding new households
 */
class HouseholdsList extends Component {
    constructor(props) {
        super(props);
        this.goToAddHousehold = this.goToAddHousehold.bind(this);
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
    }

    /**
     * Switches Households content page to the add house page.
     */
    goToAddHousehold() {
        this.props.setPage(<AddHousehold setPage={this.props.setPage}/>);
    };

    /**
     * Toggles a house button between selected and unselected.
     */
    toggleHouseButton(e) {
        document.querySelector('.house-button-selected').classList.remove('house-button-selected');
        e.target.classList.add('house-button-selected');
    };

    render() {
        return (
            <div id="house-list">
                <button className="house-button">UW dorm</button>
                <button className="house-button" onClick={this.goToAddHousehold}>Add household</button>
            </div>
        )
    }
}

export default HouseholdsList;