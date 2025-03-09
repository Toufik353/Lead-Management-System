import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavigationBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Lead Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Button variant="danger" onClick={handleLogout} className="ms-2">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
