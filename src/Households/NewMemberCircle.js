import React, {Component} from 'react';
import { FaPlus } from 'react-icons/fa';

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

    toggleCircle(circle) {
        circle.classList.toggle('ahmn-circle-selected');
        this.toggleFormDisplay();
    }

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

    clickAdd(e) {
        this.toggleCircle(e.currentTarget);
        this.toggleFormDisplay();
    }

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