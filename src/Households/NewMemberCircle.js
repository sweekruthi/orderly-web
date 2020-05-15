import React, {Component} from 'react';
import { FaPlus } from 'react-icons/fa';

/**
 * Member circle which a user can click on to manually users to the house.
 */
class NewMemberCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formDisplay: "none"
        };

        this.toggleCircle = this.toggleCircle.bind(this);
        this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    /**
     * Toggles the given circle between being selected and unselected.
     * @param circle the circle to toggle
     */
    toggleCircle(circle) {
        circle.classList.toggle('ahmn-circle-selected');
        this.toggleFormDisplay();
    }

    /**
     * Toggles the display for entering a members name between visible and invisible.
     */
    toggleFormDisplay() {
        let newDisplay = 'none';
        if (this.state.formDisplay === 'none') {
            newDisplay = 'block';
        }
        this.setState(
            {
                formDisplay: newDisplay
            }
        )
    }

    /**
     * Displays the form for entering a new users name
     * @param e
     */
    clickAdd(e) {
        this.toggleCircle(e.currentTarget);
        this.toggleFormDisplay();
    }

    /**
     * Registers the new user with the household.
     */
    addNew() {
        this.props.addMember();
        this.toggleCircle(document.getElementById('new-member-circle'));
        this.toggleFormDisplay();
    }

    render() {
        return(
            <div>
                <div id="new-member-circle" className={"add-house-new-member-circle"} onClick={this.clickAdd}>
                    <FaPlus className="ahmn-circle-plus" color="grey" size={30}/>
                </div>
                <div style={{display: this.state.formDisplay}}>
                    <input id = "new-member" className="add-house-new-member-form" type="text" style={{display: "inline"}}/>
                    <button id="ahnm-submit" style={{display: "inline"}} onClick={this.addNew}>Add</button>
                </div>
            </div>
        );
    }
}

export default NewMemberCircle