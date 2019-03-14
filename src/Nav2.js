import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

class Nav2 extends Component {
    constructor(props) {
        super(props);
    
        // this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    render() {
        return (
            // <Navbar color="light" light expand="md">
            //     <NavbarBrand href="/">color classifier</NavbarBrand>
            //     <NavbarToggler onClick={this.toggle} />
            //     <Collapse isOpen={this.state.isOpen} navbar>
            //         <Nav className="ml-auto" navbar>
            //         <NavItem>
            //         <NavLink href="/model/">model</NavLink>
            //         </NavItem>
            //         <NavItem>
            //             <NavLink href="/">data collection</NavLink>
            //         </NavItem>
            //         <NavItem>
            //             <NavLink href="/visualization/">visualization</NavLink>
            //         </NavItem>
            //         </Nav>
            //     </Collapse>
            // </Navbar>
            // <nav className="navbar navbar-light bg-light">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">color classifier</NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-item nav-link" to="/">Data Collection</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-item nav-link" to="/model">Model</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-item nav-link" to="/visualization">Visualization</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
                
            // </nav>
        );
    }
}

export default Nav2;


// export default class Navigationbar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//   render() {
//     return (
//       <div>
//         <Navbar color="light" light expand="md">
//           <NavbarBrand href="/">color classifier</NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               <NavItem>
//                 <NavLink href="/model/">model</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/">data collection</NavLink>
//               </NavItem>
//               <NavItem>
//                 <NavLink href="/visualization/">visualization</NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     );
//   }
// }