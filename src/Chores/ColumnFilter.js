import React, {Component} from 'react';
import HouseIcon from "../Households/HouseIcon";
import MemberIcon from "../Households/MemberIcon";

/**
 * A row of icons used for filtering chores by a group.  When in calendar view these simply serve
 * to show which column of chores belong to which group.  When in list view though they act as buttons which allow
 * the user to filter the chores shown by the group they belong to.
 */
class ColumnFilter extends Component {
    constructor(props) {
        super(props);
        this.toggleButton = this.toggleButton.bind(this);
        this.buttonPosition = this.buttonPosition.bind(this);
        this.createIcons = this.createIcons.bind(this);
    }

    /**
     * Called whenever the chore view is switched.  If switched to the list view. Then toggle the initial house button
     * on.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.choreView !== 'list' && this.props.choreView === 'list') {
            document.querySelector('.column-button-list').classList.add('column-button-list-selected');
        }
    }

    /**
     * Toggles the selected button on and the previously selected button off.
     */
    toggleButton(e, selectedIcon) {
        if (this.props.choreView === 'list') {
            document.querySelector('.column-button-list-selected').classList.remove('column-button-list-selected');
            e.currentTarget.classList.add('column-button-list-selected');
        }
        this.props.selectIcon(selectedIcon);
    }

    /**
     * Calculates a button position based off of its index.
     * @param index the buttons position within the ColumnFilter
     * @param columnStart The amount of offset to give the initial icon
     */
    buttonPosition(index, columnStart) {
        const style = {
            position: 'relative',
            float: 'left',
            width: '4em',
            left: (columnStart + 5 * index) + 'em'
        };

        return style;
    }

    createIcons() {
        let icons = [];
        let index = 0;
        for (let obj in this.props.iconObjs) {
            let icon = this.props.iconObjs[obj];
            if (this.props.iconType === 'house') {
                icons.push(<HouseIcon iconClass={'column-button-' + this.props.choreView} iconPos={this.buttonPosition(index, 8)}
                                  onClick={this.toggleButton} iconSize={40} nameSize="14pt" houseName={icon.name} houseID={icon.id}/>);
            } else if (this.props.iconType === 'member') {
                icons.push(<MemberIcon className={'column-button-' + this.props.choreView} iconPos={this.buttonPosition(index, 8)}
                                   onClick={this.toggleButton} member={icon.name} memberID={icon.id}/>);
            }
            index++;
        }

        return icons;
    }

    render() {
        return(
          <div id='column-filter'>
              {this.createIcons()}
          </div>
        );
    }
}

export default ColumnFilter