import React, {Component} from 'react';
import MemberCircle from "./MemberCircle";

/**
 * Displays an icon for a household
 */
class MemberIcon extends Component {
    render() {
        return(
            <div style = {this.props.iconPos}>
                <MemberCircle className={this.props.className} onClick={(e) => this.props.onClick(e, this.props.member)}
                              circleSize={"15pt"} nameSize={"14pt"} member={this.props.member}/>
            </div>
        );
    }
}

export default MemberIcon