import React, {Component} from 'react';
import AddHousehold from "./AddHousehold";

class HouseholdsList extends Component {
    constructor(props) {
        super(props);
        this.goToAddHousehold = this.goToAddHousehold.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    goToAddHousehold() {
        this.props.setPage(<AddHousehold/>);
    };

    handleClick(e) {
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