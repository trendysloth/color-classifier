import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <Link className="nav-item nav-link" to="/">Data Collection</Link>
                <Link className="nav-item nav-link" to="/model">Model</Link>
                <Link className="nav-item nav-link" to="/visualization">Visualization</Link>
                
            </nav>
        );
    }
}

export default Nav;