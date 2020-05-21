import React, {Component} from 'react';

/**
 * A box for displaying a single chore within the Calendar view.
 */
class ChoreListBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descDisplay: "none"
        };
        this.toggleDescDisplay = this.toggleDescDisplay.bind(this);
    }

    /**
     * Toggles the display of the drop down element showing the description of a chore.
     */
    toggleDescDisplay(e) {
        e.target.classList.toggle('clb-desc-button-selected');
        let newDisplay = 'none';
        if (this.state.descDisplay === 'none') {
            newDisplay = 'block';
        }
        this.setState(
            {
                descDisplay: newDisplay
            }
        )
    }

    render() {
        return(
            <div>
                <div className="chore-list-box">
                    <div className="chore-list-box-left">
                        <div className="clb-title">{this.props.title}</div>
                        <div className="clb-supplies-title">Supplies:</div>
                        <div className="clb-supplies">{this.props.supplies}</div>
                    </div>
                    <div className="chore-list-box-right">
                        <button className="clb-desc-button" onClick={this.toggleDescDisplay}>description</button>
                    </div>
                </div>
                <div className="chore-list-desc-box" style={{display: this.state.descDisplay}}>
                    <div className="chore-list-desc">
                        {this.props.description}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChoreListBox
