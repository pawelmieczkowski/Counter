import {Accordion, Button, Container, Form, Table} from "react-bootstrap";
import './CounterPage.css'
import React, {useState, useEffect} from "react";


export interface ICounter {
    id?: number;
    name?: string,
    count?: number,
    color?: string,
    created?: Date
}

export const CounterPage = () => {

    const [counters, setCounters] = useState<ICounter[]>([]);
    const [formData, setFormData] = useState<ICounter>();

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
    }, []);

    const sendNewCounter = async () => {
        let response = await fetch('http://localhost:8080/api/v1/counters/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData?.name,
                color: formData?.color
            }),
        });
        await response.json();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        sendNewCounter().catch(error => console.log(error))
        window.location.reload();
    }

    const handleCounterSubmit = async (id: number | undefined) => {
        let response = await fetch(`http://localhost:8080/api/v1/counters/${id}`, {
            method: 'PUT',
            headers: {}
        });
        await response.json();
        getCounter().catch(error => {
            console.log(error)
        })
    }

    return (
        <Container className={"text-white-50 h-100"} style={{padding: "20px", background: "#0f1015"}} fluid>
            <Container className={"w-100 py-4"} fluid style={{background: "#191c24", borderRadius: "5px"}}>
                <Table responsive={true} borderless={false} style={{color: "white", borderColor: "#0f1015"}}>
                    <tbody>
                    {counters.map(c => (
                        <tr key={c.id}>
                            <td style={{background: c.color, width: 10}}>
                            </td>
                            <td>
                                {c.name}
                            </td>
                            <td>
                                {c.count}
                            </td>
                            <td style={{
                                textAlign: "right"
                            }}>
                                <Button onClick={() => handleCounterSubmit(c.id)}>+1</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Accordion flush className={"bg-dark text-white-50"}>
                    <Accordion.Item eventKey={'formAccordion'} style={{background: "#191c24"}}>
                        <Accordion.Header className={"bg-dark"}>
                            Add new counter
                        </Accordion.Header>
                        <Accordion.Body style={{
                            borderStyle: "solid",
                            borderColor: "#12151e",
                            borderWidth: "0 2px 2px 2px"
                        }}>
                            <Form
                                onSubmit={event => handleSubmit(event as any)}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>New Counter name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Counter name..."
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group controlId="color">
                                    <Form.Label>Choose Color of a Counter</Form.Label>
                                    <Form.Control
                                        type="color"
                                        defaultValue="#563d7c"
                                        title="Choose your color"
                                        onChange={e => setFormData({...formData, color: e.target.value})}
                                    />
                                </Form.Group>
                                <Button className={"my-2 btn-primary"} type="submit">Submit form</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Container>
    )
        ;
}
