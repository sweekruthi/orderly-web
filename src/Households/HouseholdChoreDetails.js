import React, {Component} from 'react';

class HouseholdChoreDetails extends Component {
    constructor(props) {
        super(props);
        this.setContent = this.setContent.bind(this);
    }

    setContent() {
        if (this.props.chore !== undefined) {
            return <div className="house-details">
                       <div id="house-details-members-title">Title</div>
                       <input id="add-chore-title-form" style={{marginBottom: '1em'}} value={this.props.chore.title}
                              type="text" onChange={this.props.handleTitleChange}/>
                       <hr className="house-details-linebreak"/>
                       <div id="house-details-members-title">Description</div>
                       <textarea id="add-chore-supplies-form" value={this.props.chore.description}
                                 onChange={this.props.handleDescChange}/>
                       <button id="add-chore-save" onClick={() => this.props.saveChanges(this.props.id)}>Save Changes</button>
                       <button id="add-chore-delete" onClick={() => this.props.deleteChore(this.props.id)}>Delete Chore</button>
                   </div>
        } else {
            return <div/>
        }
    }

    render() {
        return(this.setContent());
    }
}

export default HouseholdChoreDetails;