import React, {Component} from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Schedule from "./Schedule";
import NewMemberCircle from "./NewMemberCircle";
import MemberCircle from "./MemberCircle";

/**
 * Displays all of the information associated with a household, such as Name, members, as well as links to pages
 * containing more information.
 */
class HouseholdsDetails extends Component {
    constructor(props) {
        super(props);
        this.goToSchedule = this.goToSchedule.bind(this);
    }

    goToSchedule() {
        this.props.setPage(<Schedule setPage={this.props.setPage}/>);
    }

    render() {
        return (
            <div id="house-details">
                <div id="house-details-title">UW Dorm</div>
                <div id="house-details-members-title">Members</div>
                <hr className="house-details-linebreak"/>
                <div id="house-details-members-list">
                    <MemberCircle circleSize="36pt" nameSize="14pt"/>
                    <MemberCircle circleSize="36pt" nameSize="14pt"/>
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
                    <div className="house-details-nav-title">Preferences</div>
                    <button className="house-details-nav-button">
                        <FaChevronRight className="house-details-nav-chevron" size={45}/>
                    </button>
                </div>
                <hr className="house-details-linebreak"/>
            </div>
        )
    }
}

export default HouseholdsDetails;