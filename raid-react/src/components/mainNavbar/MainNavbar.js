import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export function MainNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">VK-Raid</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/login">Вход</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
