import React, {Component} from "react";
import HouseholdsList from "./HouseholdsList";
import HouseholdsDetails from "./HouseholdsDetails";

/**
 * Page where the user can see all of the households they are a part of and information on those households.
 */
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