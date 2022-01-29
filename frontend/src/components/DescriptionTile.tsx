import React from "react";
import {Container} from "react-bootstrap";
import {ICounter} from "../pages/CounterPage";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export const DescriptionTile = ({
                                    counter
                                }: { counter: ICounter }) => {

    return (


        <Container className={"py-4 px-4 my-2"} fluid
                   style={{background: "#191c24", borderRadius: "5px", minHeight: "250px"}}>
            <h1>Counter: {counter.name}</h1>
            <p>{counter.description}</p>
        </Container>
    )

}