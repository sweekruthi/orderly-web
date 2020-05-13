import React, {Component} from 'react';
import { FaPlus } from 'react-icons/fa';

class AddHouseNewMemberCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formDisplay: "none"
        };
        this.addNew = this.addNew.bind(this);
        this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
    }

    toggleFormDisplay(e) {
        e.currentTarget.classList.toggle('ahmn-circle-selected');
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

    addNew() {
        let newDisplay = 'none';
        if (this.state.formDisplay === 'none') {
            newDisplay = 'block';
        }
        this.setState(
            {
                formDisplay: newDisplay
            }
        );
        this.props.addMember();
    }


    render() {
        return(
            <div>
                <div id="new-mem" className={"add-house-new-member-circle"} onClick={this.toggleFormDisplay}>
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

export default AddHouseNewMemberCircle