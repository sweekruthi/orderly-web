import React, {Component} from 'react';
import { FaChevronRight } from 'react-icons/fa';
import HouseSchedule from "./HouseSchedule";
import MemberCircle from "./MemberCircle";

/**
 * Displays all of the information associated with a household, such as Name, members, as well as links to pages
 * containing more information.
 */
class HouseholdsDetails extends Component {
    constructor(props) {
        super(props);
        this.createHouseTitle = this.createHouseTitle.bind(this);
        this.createHouseDetails = this.createHouseDetails.bind(this);
        this.goToSchedule = this.goToSchedule.bind(this);
    }

    createHouseTitle() {
        let title = "";
        if (this.props.house === undefined) {
            title = "Create a house to start building a schedule"
        } else {
            title = this.props.house.title;
        }

        if (this.props.house === undefined) {
            return <div id="house-details-title">{title}</div>
        } else {
            return <div>
                        <div id="house-details-title">{title}</div>
                        <div id="house-details-members-title">Members</div>
                   </div>
        }
    }

    createHouseDetails() {
        if (this.props.house === undefined) {
            return <div/>;
        } else {
            return <div>
                        <div id="house-details-members-list">
                            {this.props.house.members.map((value) => {
                            return <MemberCircle member={value.username} memberSpacing='house-details-member' circleSize="36pt" nameSize="14pt"/>})}
                        </div>
                        <hr className="house-details-linebreak"/>
                        <div className="house-details-nav-away">
                            <div className="house-details-nav-title">Schedule</div>
                            <button id="schedule-button" className="house-details-nav-button" onClick={this.goToSchedule}>
                                <FaChevronRight className="house-details-nav-chevron" size={45}/>
                            </button>
                        </div>
                        <hr className="house-details-linebreak"/>
                        <div className="house-details-nav-away">
                            <div className="house-details-nav-title" > Preferences </div>
                            <button className="house-details-nav-button">
                                <FaChevronRight className="house-details-nav-chevron" size={45}/>
                            </button>
                        </div>
                        <hr className="house-details-linebreak"/></div>
        }
    }

    goToSchedule() {
        this.props.setPage(<HouseSchedule setPage={this.props.setPage} house={this.props.house}/>);
    }

    render() {
        return (
            <div className="house-details">
                {this.createHouseTitle()}
                <hr className="house-details-linebreak"/>
                {this.createHouseDetails()}
            </div>
        )
    }
}

export default HouseholdsDetails;