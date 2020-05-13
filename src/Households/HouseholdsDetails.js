import React, {Component} from 'react';
import { FaChevronRight } from 'react-icons/fa';

class HouseholdsDetails extends Component {
    constructor(props) {
        super(props);
    }

    goToAddHousehold(e) {
        document.querySelector('.nav-selected').classList.remove('nav-selected');
        e.target.classList.add('nav-selected');
    };

    render() {
        return (
            <div id="house-details">
                <div id="house-details-title">UW Dorm</div>
                <div id="house-details-members-title">Members</div>
                <hr className="house-details-linebreak"/>
                <div id="house-details-members-list">
                    <div className={"house-details-member-circle"}/>
                    <div className={"house-details-member-circle"}/>
                </div>
                <hr className="house-details-linebreak"/>
                <div className="house-details-nav-away">
                    <div className="house-details-nav-title">Schedule</div>
                    <button className="house-details-nav-button">
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