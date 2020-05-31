import React, {Component} from 'react';
import BackArrow from "./BackArrow";

class ScheduleEdit extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div id="add-house">
                <div className="add-filler"/>
                <BackArrow goBack={this.props.goBack}/>
                <div className="house-details">
                    <div id="house-details-members-title">Starting Week</div>
                    <div id="schedule-start-forms">
                        <input className="schedule-start-form" type="text" placeholder='MM'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form"  type="text" placeholder='DD'/>
                        <div className='schedule-start-slash'>/</div>
                        <input className="schedule-start-form" style={{width: '3em'}} type="text" placeholder='YYYY'/>
                    </div>
                    <hr className="house-details-linebreak"/>
                    <div id="house-details-members-title">Length</div>
                    <input className="schedule-length-form" type='text' placeholder='# Weeks'/>
                </div>
            </div>
        );
    }
}

export default ScheduleEdit