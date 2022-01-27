import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import {MainPage} from "./Pages/MainPage";
import {MenuBar} from "./Components/MenuBar";
import {TopBar} from "./Components/TopBar";
import {CounterPage} from "./Pages/CounterPage";


function App() {
    return (
        <Container fluid className={"vh-100"}>
            <Router>
                <Row className="h-100">
                    <TopBar/>
                    <Row style={{height: "calc(100% - 50px)", width:"100%", margin:"0", padding:"0"}}>
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
