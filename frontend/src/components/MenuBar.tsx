import {Nav, Container, Row, Navbar} from "react-bootstrap";
import './MenuBar.css'


export const MenuBar = () => {

    return (
        <Container className={"h-100 ps-0"} fluid>
            <Row>
                <Navbar variant={"dark"} className={"ps-0"}>
                    <Nav className="flex-column w-100 h-100 lh-lg">
                        <Nav.Link href="#/" active={window.location.pathname === "/"} className={"p-0 m-0"}>
                            <Container fluid className={"py-2"}>
                                Main Page
                            </Container>
                        </Nav.Link>
                        <Nav.Link href="#/counter-page" active={window.location.pathname === "/counter-page"}
                                  className={"p-0 m-0"}>
                            <Container fluid className={"py-2"}>
                                Counter Page
                            </Container>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Row>
        </Container>
    );
}