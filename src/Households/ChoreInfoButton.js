import React, {Component} from 'react';

class ChoreInfoButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.displayChoreInfo(this.props.chore.id);
        console.log(this.props.chore.id)
        this.props.toggleButton(e);
    }

    render() {
        return(
            <button className="house-button" onClick={this.handleClick}>
                {this.props.chore.title}
            </button>
        );
    }
}

export default ChoreInfoButton