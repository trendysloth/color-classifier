import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { HashRouter, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Datacollection from './Datacollection';
import Train from './Train';
import Test from './Test';
import Visualization from './Visualization';

class RouterIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    }

    render() {
        return (

            <HashRouter>
                <div>
                    {/* <Navigationbar/> */}
                    <Switch>
                        <Route path="/model" component={Test} exact/>
                        <Route path="/" component={Datacollection} exact/>
                        <Route path="/visualization" component={Visualization} exact/>
                    </Switch>

                </div>
                
            </HashRouter>

            
        );
    }
}

export default RouterIndex;