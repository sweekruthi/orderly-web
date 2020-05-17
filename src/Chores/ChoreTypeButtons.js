import React, {Component} from 'react';
import * as ENUMS from "../App/EnumStor";

/**
 * Buttons which allow the user to switch between viewing different types of chores.
 */
class ChoreTypeButtons extends Component {
    constructor(props) {
        super(props);
        this.toggleTypeButton = this.toggleTypeButton.bind(this);
    }

    componentDidMount() {
        let selectedType = '#' + this.props.initType + '-chores';
        document.querySelector(selectedType).classList.add('chore-button-selected');
    }

    /**
     * Toggles the selected chore button on and the previously selected button off.
     */
    toggleTypeButton(e, type) {
        document.querySelector('.chore-button-selected').classList.remove('chore-button-selected');
        e.target.classList.add('chore-button-selected');
        this.props.setChoreType(type);
    }

    render() {
        return(
          <div id="chore-type">
              <button id="upcoming-chores" className="chore-button" onClick={(e) =>
                  this.toggleTypeButton(e, ENUMS.ChoreType.UPCOMING)}>
                  Upcoming Chores</button>
              <button id="completed-chores" className="chore-button" onClick={(e) =>
                  this.toggleTypeButton(e, ENUMS.ChoreType.COMPLETED)}>
                  Completed Chores</button>
              <button id="overdue-chores" className="chore-button" onClick={(e) =>
                  this.toggleTypeButton(e, ENUMS.ChoreType.OVERDUE)}>
                  Overdue Chores</button>
          </div>
        );
    }
}

export default ChoreTypeButtons