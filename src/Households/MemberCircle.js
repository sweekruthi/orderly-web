import React, {Component} from 'react';

/**
 * Displays a portrait for the user
 */
class MemberCircle extends Component {
    render() {
        return(
            <div className={this.props.memberSpacing}>
                <div className={'member-circle ' + this.props.className} style={{fontSize: this.props.circleSize}} onClick={this.props.onClick}/>
                <div className={"member-circle-name"} style={{fontSize: this.props.nameSize}}>{this.props.member}</div>
            </div>
        );
    }
}

export default MemberCircle