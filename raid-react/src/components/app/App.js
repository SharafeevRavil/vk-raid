import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Login} from "../login/Login";
import {MainNavbar} from "../mainNavbar/MainNavbar";
import {Home} from "../home/Home";
import Container from "react-bootstrap/Container";

export default function BasicExample() {
    return (
        <Router>
            <MainNavbar/>
            <Container>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}
