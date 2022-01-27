import {Col, Container, Row} from "react-bootstrap";


export const TopBar = () => {

    return (
        <Container className={"text-white-50"} fluid style={{height: "65px", borderStyle:"solid",
            borderWidth:"0 0 2px 0", borderColor:"black"}}>
            <Row className={"h-100"}>
                <Col className={"fw-bold fs-2  d-flex justify-content-center align-self-center"} style={{letterSpacing:"2px"}}>
                    Counter Page
                </Col>
            </Row>
        </Container>
    );
}