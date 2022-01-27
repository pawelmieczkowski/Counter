import {Container} from "react-bootstrap";
import './CounterPage.css'
import React, {useState, useEffect} from "react";
import {MainCounterList} from "../components/MainCounterList";

export interface ICounter {
    id?: number;
    name?: string,
    description?: string,
    count?: number,
    color?: string,
    created?: Date
}

export const CounterPage = () => {
    const [counters, setCounters] = useState<ICounter[]>([]);
    const [refresh, setRefresh] = useState<any>();


    const getCounter = async () => {
        let response = await fetch('http://localhost:8080/api/v1/counters/all', {
            method: 'GET'
        });
        let counters = await response.json();
        setCounters(counters);
    }

    useEffect(() => {
        getCounter().catch(error => {
            console.log(error)
        })
    }, [refresh]);


    return (
        <Container className={"text-white-50 h-100"} style={{padding: "20px", background: "#0f1015"}} fluid>
            <MainCounterList counters={counters} refresh={setRefresh}/>
        </Container>
    )
        ;
}

