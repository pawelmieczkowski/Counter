import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Line} from 'react-chartjs-2'
import {ICounter} from "../pages/CounterPage";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export const ChartTile = ({
                              counter
                          }: { counter: ICounter }) => {

    const [labels, setLabels] = useState<Date[] | undefined>([]);
    const [chartData, setChartData] = useState<number[]>([])

    const data = {
        labels: labels,
        datasets: [{
            label: counter.name,
            backgroundColor: counter.color,
            borderColor: counter.color,
            data: chartData,
        }]
    };

    useEffect(() => {
        let uniqueLabels = Array.from(new Set(counter.counterEntries?.map(entry => entry.date)))
        setLabels(uniqueLabels)

        let data = Array.from(new Set(counter.counterEntries?.map(entry => entry.valueChange)))
        setChartData(data)
    }, [counter])

    return (
        <Container className={"my-4"} fluid
                   style={{background: "#191c24", borderRadius: "5px"}}>
            <Row className={"p-2 m-0 g-0"}>
                <Col className={"p-2 m-0"}>
                    <Line className={"w-100"} options={{maintainAspectRatio: false}} data={data}/>
                </Col>
            </Row>
        </Container>
    );
}