import React, {Component} from 'react';
import * as ENUMS from "../App/EnumStor";
import { FaRegCalendar } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

/**
 * Buttons which allow the user to switch between different Chore views.
 */
class ChoreViewButtons extends Component {
    constructor(props) {
        super(props);
        this.toggleViewButton = this.toggleViewButton.bind(this);
    }

    componentDidMount() {
        let selectedView = "#chore-view-" + this.props.initView;
        document.querySelector(selectedView).classList.add('chore-view-button-selected');
    }

    /**
     * Toggles the selected chore button on and the previously selected button off.
     */
    toggleViewButton(e, view) {
        document.querySelector('.chore-view-button-selected').classList.remove('chore-view-button-selected');
        e.currentTarget.classList.add('chore-view-button-selected');
        this.props.setChoreView(view);
    };

    render() {
        return(
          <div id="chore-view">
              <button id="chore-view-list" className="chore-view-button" onClick={(e) =>
                  this.toggleViewButton(e, ENUMS.ChoreView.LIST)}>
                  <FaBars id="list-icon" size={55}/></button>
              <button id="chore-view-calendar" className="chore-view-button" onClick={(e) =>
                  this.toggleViewButton(e, ENUMS.ChoreView.CALENDAR)}>
                  <FaRegCalendar id="calendar-icon" size={55}/></button>
          </div>
        );
    }
}

export default ChoreViewButtons