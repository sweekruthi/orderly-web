import React, {Component} from 'react';
import { FaHome } from 'react-icons/fa';

/**
 * Displays an icon for a household
 */
class HouseIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div><FaHome size={this.props.iconSize}/></div>
                <div className={"member-circle-name"} style={{fontSize: this.props.nameSize}}>{this.props.member}</div>
            </div>
        );
    }
}

export default HouseIcon