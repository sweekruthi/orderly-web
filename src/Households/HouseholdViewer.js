import React, {Component} from "react";
import HouseholdsList from "./HouseholdsList";
import HouseholdsDetails from "./HouseholdsDetails";

/**
 * Page where the user can see all of the households they are a part of and information on those households.
 */
class HouseholdViewer extends Component {
    constructor(props) {
        super(props);

        this.getInitHouse = this.getInitHouse.bind(this);

        this.state = {
            selectedHouse: this.getInitHouse()
        };
        this.setSelectedHouse = this.setSelectedHouse.bind(this)
    }

    getInitHouse() {
        let initHouse = '-';
        for (let house in this.props.houses) {
            initHouse = this.props.houses[house].id;
            break;
        }
        return initHouse;
    }

    setSelectedHouse(selectedHouse) {
        this.setState(
            {
                selectedHouse: selectedHouse
            }
        );
    }

    render() {
        return(
            <div className="household-viewer">
                <HouseholdsList houses={this.props.houses} initSelected={this.state.selectedHouse}
                                addHouse={this.props.addHouse} setSelectedHouse={this.setSelectedHouse}
                                setPage={this.props.setPage}/>
                <HouseholdsDetails house={this.props.houses[this.state.selectedHouse]} setPage={this.props.setPage}/>
            </div>
        );
    }
}

export default HouseholdViewer