import React, {Component} from 'react';
import './Households.css';
import HouseholdViewer from "./HouseholdViewer";

class Households extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentPage: <HouseholdViewer setPage={this.setHousePage}/>
        };

    }

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