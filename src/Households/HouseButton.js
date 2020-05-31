import React, {Component} from 'react';

class HouseButton extends Component {
    render() {
        return(
            <button id={this.props.id} className="house-button" onClick={(e) => this.props.onClick(e, this.props.id)}>{this.props.title}</button>
        );
    }
}

export default HouseButton