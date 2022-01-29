import {Col, Container, Row} from "react-bootstrap";
import './CounterPage.css'
import React, {useState, useEffect} from "react";
import {MainCounterList} from "../components/MainCounterList";
import {ChartTile} from "../components/ChartTile";
import {DescriptionTile} from "../components/DescriptionTile";

export interface ICounter {
    id?: number;
    name?: string,
    description?: string,
    count?: number,
    color?: string,
    created?: Date,
    counterEntries?: counterEntry[]
}

export interface counterEntry {
    date: Date;
    counterId: number;
    valueChange: number;
}

export const CounterPage = () => {
    const [counters, setCounters] = useState<ICounter[]>([{id: 0, name: "a", description: ""}]);
    const [refresh, setRefresh] = useState<any>("firstRender");
    const [selected, setSelected] = useState<ICounter>({id: 0, name: "a", description: ""})


    const getCounter = async () => {
        let response = await fetch('http://localhost:8080/api/v1/counters/all', {
            method: 'GET'
        });
        let counters = await response.json();
        setCounters(counters);
        refresh === "firstRender" ? setSelected(counters[0]) :
            setSelected(counters.filter((item: ICounter) => item.id === selected.id)[0])

    }

    useEffect(() => {
        getCounter().catch(error => {
            console.log(error)
        })
    }, [refresh]);

    return (
        <Container className={"text-white-50 h-100"} style={{background: "#0f1015"}} fluid>
            <Row className={"p-0 m-0 g-0"}>
                <Col className={"ps-4 py-4"}>
                    <MainCounterList counters={counters} refresh={setRefresh} selected={selected}
                                     setSelected={setSelected}/>
                </Col>
                <Col className={"p-4"}>
                    <DescriptionTile counter={selected}/>
                    <ChartTile counter={selected}/>
                </Col>
            </Row>
        </Container>
    );
}

// counter={counters.filter(item => item.id === selected.id)[0]}