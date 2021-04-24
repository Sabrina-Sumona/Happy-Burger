import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Logo from '../../assets/images/logo.png';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Header = props => {
    let links = null;
    const mystyle = {
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "5px",
        boxShadow: "2px 2px #888888",
    }
    if (props.token === null) {
        links = (
            <Nav>
                <NavItem style={mystyle} className="mr-md-3">
                    <NavLink exact to="/login" className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav>
                <NavItem style={mystyle} className="mr-md-3">
                    <NavLink exact to="/" className="NavLink">Burger Builder</NavLink>
                </NavItem>
                <NavItem style={mystyle} className="mr-md-3">
                    <NavLink exact to="/orders" className="NavLink">Orders</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#00AFDB",
                height: "70px"
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 pt-3 Brand">
                    <img src={Logo} alt="Logo" width="165px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header);