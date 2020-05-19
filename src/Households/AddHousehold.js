import React, {Component} from 'react';
import NewMemberCircle from "./NewMemberCircle";
import MemberCircle from "./MemberCircle";
import Households from "./Households";

/**
 * Page which allows a user to asoociate a new household with their account. Either by Creating a new house, or by
 * joining a pre-existing one.
 */
class AddHousehold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
        this.addMember = this.addMember.bind(this);
        this.addHousehold = this.addHousehold.bind(this);
    }

    /**
     * Adds a new member to a house the user is creating.
     */
    addMember() {
        let newMember = document.getElementById("new-member").value;
        this.state.members.push(newMember);
        this.setState(
            {
                members: this.state.members
            }
        );

        console.log(this.state.members);
    };

    /**
     * Adds a new household either joined or created by the user.
     */
    addHousehold() {
        this.props.setPage(<Households/>);
    }

    render() {
        return(
            <div id="add-house">
                <div className="add-filler"></div>
                <div id="house-details">
                    <form>
                        <input id="add-house-title-form" type="text"></input>
                    </form>
                    <div id="house-details-members-title">Members</div>
                    <hr className="house-details-linebreak"/>
                    <div id="house-details-members-list">
                        {this.state.members.map((value) => {
                            return <MemberCircle memberSpacing='house-details-member' circleSize="36pt" nameSize="14pt" member={value}/>})}
                        <NewMemberCircle memberSpacing='house-details-member' circleSize="36pt" nameSize="14pt" addMember={this.addMember}/>
                    </div>
                    <hr className="house-details-linebreak"/>
                    <button id="add-house-submit" onClick={this.addHousehold}>Create House</button>
                </div>
            </div>
        );
    }
}

export default AddHousehold