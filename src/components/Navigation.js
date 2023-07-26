import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/Coin.png'
import Cryptonewspage from "../views/Cryptonewspage";

function Navigation() {
    return (
        <Navbar expand="lg" className="navbar  p-3 mb-3 ">
            <Container>
                <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-links">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/fiat">Fiat</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/Cryptonewspage">Cryptonews</Nav.Link>
                        <Nav.Link href="/Forexpage">Currency converter</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation