import React, {Component} from 'react';
import AddHouseNewMemberCircle from "./AddHouseNewMemberCircle";
import MemberCircle from "./MemberCircle";

class AddHousehold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
        this.addMember = this.addMember.bind(this);
        console.log("running");
    }

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
                            return <MemberCircle member={value}/>})}
                        <AddHouseNewMemberCircle addMember={this.addMember}/>
                    </div>
                    <hr className="house-details-linebreak"/>
                </div>
            </div>
        );
    }
}

export default AddHousehold