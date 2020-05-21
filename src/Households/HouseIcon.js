import React, {Component} from 'react';
import { FaHome } from 'react-icons/fa';

/**
 * Displays an icon for a household
 */
class HouseIcon extends Component {
    render() {
        return(
            <div className='house-icon' style={this.props.iconPos}>
                <button onClick={(e) => this.props.onClick(e, this.props.houseID)} className={this.props.iconClass}>
                    <FaHome size={this.props.iconSize}/>
                </button>
                <div className='icon-name' style={{fontSize: this.props.nameSize}}>{this.props.houseName}</div><br/>
            </div>
        );
    }
}

export default HouseIcon