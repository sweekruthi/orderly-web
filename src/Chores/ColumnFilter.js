import React, {Component} from 'react';

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
    }

    /**
     * Called whenever the chore view is switched.  If switched to the list view. Then toggle the initial house button
     * on.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.choreView === 'list' && document.querySelector('.column-button-list-selected') == null) {
            document.querySelector('#house-init').classList.add('column-button-list-selected');
        }
    }

    /**
     * Toggles the selected button on and the previously selected button off.
     */
    toggleButton(e) {
        if (this.props.choreView === 'list') {
            document.querySelector('.column-button-list-selected').classList.remove('column-button-list-selected');
            e.currentTarget.classList.add('column-button-list-selected');
        }
    }

    /**
     * Calculates a button position based off of its index.
     * @param index the buttons position within the ColumnFilter
     */
    buttonPosition(index) {
        const style = {
            position: 'relative',
            width: '4em',
            left: (this.props.columnStart + 5 * index) + 'em'
        };

        return style;
    }

    render() {
        return(
          <div id='column-filter'>
                <button id='house-init' className={'column-button-' + this.props.choreView} style={this.buttonPosition(0)}
                        onClick={this.toggleButton}>{this.props.columnIcon}</button>
                <button className={'column-button-' + this.props.choreView} style={this.buttonPosition(1)}
                        onClick={this.toggleButton}>{this.props.columnIcon}</button>
                <button className={'column-button-' + this.props.choreView} style={this.buttonPosition(2)}
                        onClick={this.toggleButton}>{this.props.columnIcon}</button>
          </div>
        );
    }
}

export default ColumnFilter