import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Logo from '../../assets/images/logo.png';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#00AFDB",
                height: "70px"
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 pt-3 Brand">
                    <img src={Logo} alt="Logo" width="165px" />
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink exact to="/" className="NavLink">Burger Builder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/orders" className="NavLink">Orders</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/login" className="NavLink">Login</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;