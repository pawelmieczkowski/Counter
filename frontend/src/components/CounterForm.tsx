import {ICounter} from "../pages/CounterPage";
import {Button, Form} from "react-bootstrap";
import React from "react";

export const CounterForm = ({
                                handleSubmit,
                                formData,
                                setFormData,
                            }: {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    formData: ICounter | undefined,
    setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {

    return (
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
    );
}