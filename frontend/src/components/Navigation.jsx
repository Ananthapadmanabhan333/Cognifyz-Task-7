import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, LogOut } from 'lucide-react';
import api from '../services/api';

const Navigation = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.get('/auth/logout');
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm mb-4 py-3 sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-primary">
                    <Hexagon size={28} />
                    InternHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="fw-semibold px-3">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/github" className="fw-semibold px-3">GitHub</Nav.Link>
                                <Nav.Link as={Link} to="/resume" className="fw-semibold px-3">AI Resume</Nav.Link>
                                <Nav.Link as={Link} to="/recommendations" className="fw-semibold px-3">Recommendations</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={user.profilePicture} alt="user" className="rounded-circle" style={{ width: '35px', height: '35px' }} />
                                    <span className="fw-bold">{user.name}</span>
                                </div>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="d-flex align-items-center gap-1 border-0">
                                    <LogOut size={16} /> Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button href="http://localhost:5000/api/auth/google" variant="outline-dark" className="d-flex align-items-center gap-2 rounded-pill px-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" style={{ width: '18px' }} />
                                    Google
                                </Button>
                                <Button href="http://localhost:5000/api/auth/github" variant="dark" className="d-flex align-items-center gap-2 rounded-pill px-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="github" style={{ width: '18px', filter: 'invert(1)' }} />
                                    GitHub
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
