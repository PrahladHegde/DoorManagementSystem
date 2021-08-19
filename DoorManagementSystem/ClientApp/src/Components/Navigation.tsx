﻿import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component {

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/Welcome">
                            Welcome
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/Home">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/Configuration">
                            Configuration
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/Settings">
                            Settings
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}