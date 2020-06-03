import React, {Component} from 'react';
import AddHousehold from "./AddHousehold";
import HouseButton from "./HouseButton";

/**
 * Displays a list of all the households a user is a member of. As well as a button for adding new households
 */
class HouseholdsList extends Component {
    constructor(props) {
        super(props);

        this.displayHouseInfo = this.displayHouseInfo.bind(this);
        this.goToAddHousehold = this.goToAddHousehold.bind(this);
        this.toggleHouseButton = this.toggleHouseButton.bind(this);
        this.createHouseButtons = this.createHouseButtons.bind(this);
    }

    componentDidMount() {
        /*document.getElementById(this.props.initSelected).classList.add('house-button-selected');*/
    }

    /**
     * Grabs and displays info related to a household.
     */
    displayHouseInfo(e, houseID) {
        /*this.toggleHouseButton(e);
        this.props.setSelectedHouse(houseID);*/
    }

    /**
     * Switches Households content page to the add house page.
     */
    goToAddHousehold() {
        this.props.setPage(<AddHousehold addHouse={this.props.addHouse} setPage={this.props.setPage}/>);
    };

    /**
     * Toggles a house button between selected and unselected.
     */
    toggleHouseButton(e) {
        document.querySelector('.house-button-selected').classList.remove('house-button-selected');
        e.target.classList.add('house-button-selected');
    };

    createHouseButtons() {
        let houseButtons = [];

        for (let house in this.props.houses) {
            let currHouse = this.props.houses[house];
            houseButtons.push(<HouseButton onClick={this.displayHouseInfo} title={currHouse.title} id={currHouse.id} key={currHouse.id}/>);
        }

        houseButtons.push(<HouseButton onClick={this.goToAddHousehold} title={`+ Add household`} id= {-1} key={-1}/>);
        
        if (houseButtons.length !== 0) {
            return houseButtons;
        } else {
            return <button className="house-button" onClick={this.goToAddHousehold}>Create household</button>
        }
    }

    render() {
        return (
            <div className="house-list">
                {this.createHouseButtons()}
            </div>
        )
    }
}

export default HouseholdsList;