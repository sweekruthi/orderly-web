import React, {Component} from 'react';

class HouseholdChoreDetails extends Component {
    render() {
        return(
          <div className="house-details">
              {this.props.id}
          </div>
        );
    }
}

export default HouseholdChoreDetails;