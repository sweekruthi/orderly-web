import React, {Component} from 'react';

class HouseholdChoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choreTitle: this.props.chore.title
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    handleTitleChange(e) {
        this.props.chore.title = e.target.value;
        this.setState(
            {
                choreTitle: e.target.value
            }
        )
    }

    handleDescChange(e) {
        this.props.chore.description = e.target.value;
    }

    render() {
        return(
          <div className="house-details">
              <div id="house-details-members-title">Title</div>
              <input id="add-chore-title-form" style={{marginBottom: '1em'}} value={this.props.chore.title}
                     type="text" onChange={this.handleTitleChange}/>
              <hr className="house-details-linebreak"/>
              <div id="house-details-members-title">Description</div>
              <textarea id="add-chore-supplies-form" defaultValue={this.props.chore.description}
                        onChange={this.handleDescChange}/>
              <button id="add-chore-save" onClick={this.props.saveChanges(this.props.chore.id)}>Save Changes</button>
              <button id="add-chore-delete" onClick={this.props.deleteChore(this.props.chore.id)}>Delete Chore</button>
          </div>
        );
    }
}

export default HouseholdChoreDetails;