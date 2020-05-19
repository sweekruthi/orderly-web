import React, {Component} from 'react';

class ChoreInfoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    }

    render() {
        return(
            <button className="house-button" onClick={() => this.props.displayChoreInfo(this.props.id)}>
                {this.props.chore}
            </button>
        );
    }
}

export default ChoreInfoButton