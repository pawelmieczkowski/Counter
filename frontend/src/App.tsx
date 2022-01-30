import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import {MainPage} from "./pages/MainPage";
import {MenuBar} from "./components/MenuBar";
import {TopBar} from "./components/TopBar";
import {CounterPage} from "./pages/CounterPage";

function App() {
    return (
        <Container fluid className={"vh-100"}>
            <Router>
                <Row className="h-100">
                    <TopBar/>
                    <Row className={"g-0"} style={{height: "calc(100% - 65px)", width: "100%"}}>
                        <Col md={"2"} className="h-100 p-0">
                            <MenuBar/>
                        </Col>
                        <Col className={"p-0"}>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/counter-page" element={<CounterPage/>}/>
                            </Routes>
                        </Col>
                    </Row>
                </Row>
            </Router>
        </Container>

    );
}

export default App;
