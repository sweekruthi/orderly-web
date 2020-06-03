import React, {Component} from 'react';
import * as ENUMS from "../App/EnumStor";
import ChoreCalendar from "./ChoreCalendar";
import ChoreList from "./ChoreList";

class ChoreViewPage extends Component {
    constructor(props) {
        super(props);
        this.setUpChoreView = this.setUpChoreView.bind(this);
        this.rightType = this.rightType.bind(this);
    }

    setUpChoreView() {
        let viewPage = <div/>;
        /* if (this.props.choreView === ENUMS.ChoreView.CALENDAR) {
            viewPage = <ChoreCalendar choreType={this.props.choreType} chores={this.props.chores}
                                      currWeekNums={this.props.currWeekNums} inPast={this.props.inPast}
                                      rightType={this.rightType}/>
        } else { */
            viewPage = <ChoreList choreType={this.props.choreType} chores={this.props.chores}
                                  currWeekNums={this.props.currWeekNums} inPast={this.props.inPast}
                                  rightType={this.rightType} selectedIcon={this.props.selectedIcon}/>
        //}

        return viewPage;
    }

    rightType(completed) {
        return (this.props.choreType === ENUMS.ChoreType.COMPLETED && completed === true) ||
               (this.props.choreType === ENUMS.ChoreType.UPCOMING  && completed === false && this.props.inPast === false) ||
               (this.props.choreType === ENUMS.ChoreType.OVERDUE   && completed === false && this.props.inPast === true);
    }

    render() {
        console.log("curr week nums", this.props.currWeekNums);
        return (
            <div>
                {this.setUpChoreView()}
            </div>
        );
    }
}

export default ChoreViewPage