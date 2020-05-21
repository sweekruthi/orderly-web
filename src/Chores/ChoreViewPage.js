import React, {Component} from 'react';
import * as ENUMS from "../App/EnumStor";
import ChoreCalendar from "./ChoreCalendar";
import ChoreList from "./ChoreList";

class ChoreViewPage extends Component {
    constructor(props) {
        super(props);
        this.setUpChoreView = this.setUpChoreView.bind(this);
    }

    setUpChoreView() {
        let viewPage = <div/>;
        if (this.props.choreView === ENUMS.ChoreView.CALENDAR) {
            viewPage = <ChoreCalendar chores={this.props.chores} currWeekNums={this.props.currWeekNums}/>
        } else {
            viewPage = <ChoreList chores={this.props.chores} selectedIcon={this.props.selectedIcon} currWeekNums={this.props.currWeekNums}/>
        }

        return viewPage;
    }

    render() {
        return (
            <div>
                {this.setUpChoreView()}
            </div>
        );
    }
}

export default ChoreViewPage