import React, {Component} from "react";
import HouseholdsList from "./HouseholdsList";
import HouseholdsDetails from "./HouseholdsDetails";


class HouseholdViewer extends Component {
    render() {
        return(
            <div id="household-viewer">
                <HouseholdsList setPage={this.props.setPage}/>
                <HouseholdsDetails/>
            </div>
        );
    }
}

export default HouseholdViewer