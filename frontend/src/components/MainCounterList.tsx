import "./MainCounterList.css"
import React, {useState} from "react";
import {ICounter} from "../pages/CounterPage";
import {
    Accordion,
    Button,
    Container,
    Form,
    OverlayTrigger,
    Popover,
    PopoverBody,
    PopoverHeader,
    Table
} from "react-bootstrap";

export const MainCounterList = ({
                                    counters,
                                    refresh,
                                    selected,
                                    setSelected
                                }: {
    counters: ICounter[],
    refresh: React.Dispatch<React.SetStateAction<any>>
    selected: ICounter,
    setSelected: React.Dispatch<React.SetStateAction<ICounter>>
}) => {
    const [formData, setFormData] = useState<ICounter>();

    const sendNewCounter = async () => {
        let response = await fetch('http://localhost:8080/api/v1/counters/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData?.name,
                description: formData?.description,
                color: formData?.color
            }),
        });
        return await response.json()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let response = sendNewCounter().catch(error => console.log(error))
        refresh(response);
    }

    const handleCounterSubmit = async (id: number | undefined) => {
        let response = await fetch(`http://localhost:8080/api/v1/counters/${id}`, {
            method: 'PUT',
            headers: {}
        });
        refresh(await response);
    }

    const handleDeleteCounter = async (id: number | undefined) => {
        let response = await fetch(`http://localhost:8080/api/v1/counters/${id}`, {
            method: 'DELETE',
            headers: {}
        });
        refresh(await response);
    }

    const popover = (id: number | undefined) => (
        <Popover style={{background: "lightgray"}}>
            <PopoverHeader style={{background: "gray"}}>Settings</PopoverHeader>
            <PopoverBody>
                <Button onClick={() => handleDeleteCounter(id)}>Delete counter</Button>
            </PopoverBody>
        </Popover>
    )

    return (
        <Container className={"py-4 px-4 my-2"} fluid style={{background: "#191c24", borderRadius: "5px"}}>
            <Table responsive={true} borderless={false} style={{color: "white", borderColor: "#0f1015"}}>
                <tbody>
                {counters.map(c => (
                    <tr key={c.id} className={"customTableRow"} style={selected.id === c.id ? {background: "#0f1015"} : {}}>
                        <td style={{background: c.color, width: 10}}>
                        </td>
                        <td >
                            <Button
                                onClick={() => setSelected(c)}
                                style={{
                                    background: "transparent",
                                    outline: "none",
                                    boxShadow: "none",
                                    border: "0",
                                    width: "100%",
                                    textAlign: "left"
                                }}>
                                {c.name}
                            </Button>
                        </td>
                        <td>
                            {c.count}
                        </td>
                        <td style={{
                            textAlign: "right"
                        }}>
                            <Button className={"me-2"} onClick={() => handleCounterSubmit(c.id)}>+1</Button>
                            <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover(c.id)}
                                            defaultShow={false}>
                                <Button variant="secondary"><i className="bi bi-gear"/></Button>
                            </OverlayTrigger>
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
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description..."
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="color">
                                <Form.Label>Choose Color of a Counter</Form.Label>
                                <Form.Control
                                    type="color"
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
    )
}