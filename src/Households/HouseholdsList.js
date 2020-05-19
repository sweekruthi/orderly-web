import React, {Component} from 'react';
import AddHousehold from "./AddHousehold";

/**
 * Displays a list of all the households a user is a member of. As well as a button for adding new households
 */
class HouseholdsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: ["home 1", "home 2"]
        };

        this.displayHouseInfo = this.displayHouseInfo.bind(this);
        this.goToAddHousehold = this.goToAddHousehold.bind(this);
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
    }

    componentDidMount() {
        document.querySelector('.house-button').classList.add('house-button-selected');
    }

    /**
     * Grabs and displays info related to a household.
     */
    displayHouseInfo() {

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
            <div className="house-list">
                {this.state.houses.map((value) => {
                    return <button className="house-button" onClick={this.displayHouseInfo}>{value}</button>})}
                <button className="house-button" onClick={this.goToAddHousehold}>Add household</button>
            </div>
        )
    }
}

export default HouseholdsList;