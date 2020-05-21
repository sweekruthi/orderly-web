import React, {Component} from 'react';

class HouseholdChoreDetails extends Component {
    render() {
        return(
          <div className="house-details">
              <input id="add-house-title-form" type="text"/>
              <div id="house-details-members-title">Supplies</div>
              <textarea id="add-chore-supplies-form"/>
              <hr className="house-details-linebreak"/>
              <div id="house-details-members-title">Description</div>
              <textarea id="add-chore-supplies-form"/>
          </div>
        );
    }
}

export default HouseholdChoreDetails;