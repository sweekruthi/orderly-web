import React, {Component} from 'react';
import Chores from "../Chores/Chores";
import * as URLS from "../App/URLStor"
import MemberCircle from "./MemberCircle";
import ScheduleButtons from "./ScheduleButtons";

class Schedule extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <Chores schURL={URLS.HOUSE_SCH_URL} iconType={'member'}
                        scheduleAddOn={<ScheduleButtons setPage={this.props.setPage}/>}/>
            </div>
        )
    }
}

export default Schedule;