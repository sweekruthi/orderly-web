import React, {Component} from 'react';

class NavBar extends Component {

    handleClick = (e, page) => {
        document.querySelector('.nav-selected').classList.remove('nav-selected');
        e.target.classList.add('nav-selected');
        this.props.setPage(page);
    };

    render() {
        return (
            <ul id="nav-bar">
                <li className="nav-selected" onClick={(e) => this.handleClick(e, "households")}>Households</li>
                <li onClick={(e) => this.handleClick(e, "chores")}>Chores</li>
                <li onClick={(e) => this.handleClick(e, "notifications")}>Notifications</li>
            </ul>
        )
    }
}

export default NavBar;