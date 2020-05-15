import React, {Component} from 'react';

/**
 * Displays a portrait for the user
 */
class MemberCircle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className={"house-details-member-circle"}/>
                <div className={"hdm-circle-name"}>{this.props.member}</div>
            </div>
        );
    }
}

export default MemberCircle