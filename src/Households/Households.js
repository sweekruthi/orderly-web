import React, {Component} from 'react';
import './Households.css';
import HouseholdViewer from "./HouseholdViewer";

/**
 * Displays all information related to the households a user is a member of.
 */
class Households extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentPage: <HouseholdViewer setPage={this.setHousePage}/>
        };

    }

    /**
     * Sets the content page for households. Used for switching to the add house page,
     * or the schedule/preferences page.
     *
     * @param newPage the new content page to display
     */
    setHousePage = (newPage) => {
        this.setState(
            {
                contentPage: newPage
            }
        );
    };

    render() {
        return (
            <div>
                {this.state.contentPage}
            </div>
        )
    }
}

export default Households;