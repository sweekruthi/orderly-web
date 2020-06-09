import React, {Component} from 'react';
import NewMemberCircle from "./NewMemberCircle";
import MemberCircle from "./MemberCircle";
import Households from "./Households";
import BackArrow from "../Miscellaneous/BackArrow";
import Cookies from 'js-cookie';
import Request from "superagent";
import {CREATE_HOUSE_URL} from "../App/URLStor";
import {ADD_MEMBERS_URL} from "../App/URLStor";

/**
 * Page which allows a user to asoociate a new household with their account. Either by Creating a new house, or by
 * joining a pre-existing one.
 */
class AddHousehold extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "House",
            members: [],
            errorMessage: ""
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addMember = this.addMember.bind(this);
        this.submitHouse = this.submitHouse.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleTitleChange(e) {
        this.setState(
            {
                title: e.target.value
            }
        )
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
    }

    async submitHouse() {
        let houseID = '-'

        let createHouseObject = {
            name: this.state.title,
            creator: Cookies.get('username')
        };
        await Request
            .post(CREATE_HOUSE_URL)
            .send(createHouseObject)
            .then(res => {
                if (res.body.error_message === "-") {
                    houseID = res.body.household_id;
                } else {
                    this.setState(
                        {
                            errorMessage: res.body.error_message
                        }
                    )
                }
            });

        let houseMembersObject = {
            hid: houseID,
            usernames: this.state.members
        };
        await Request
            .post(ADD_MEMBERS_URL)
            .send(houseMembersObject)
            .then(() => {
                this.goBack();
            })
    }

    goBack() {
        this.props.setPage(<Households/>);
    }

    render() {
        return(
            <div id="add-house">
                <BackArrow goBack={this.goBack}/>
                <div className="add-filler"/>
                <div className="house-details">
                    <input id="add-house-title-form" type="text" onChange={this.handleTitleChange} value={this.state.title}/>
                    <div id="house-details-members-title">Members</div>
                    <hr className="house-details-linebreak"/>
                    <div id="house-details-members-list">
                        {this.state.members.map((value) => {
                            return <MemberCircle memberSpacing='house-details-member' circleSize="36pt" nameSize="14pt" member={value}/>})}
                        <NewMemberCircle memberSpacing='house-details-member' circleSize="36pt" nameSize="14pt" addMember={this.addMember}/>
                    </div>
                    <hr className="house-details-linebreak"/>
                    <button id="add-house-submit" onClick={this.submitHouse}>Create House</button>
                    {this.state.errorMessage}
                </div>
            </div>
        );
    }
}

export default AddHousehold