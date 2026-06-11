import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';

const AuthSuccess = ({ fetchUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        if (token) {
            localStorage.setItem('token', token);
            fetchUser().then(() => {
                navigate('/dashboard');
            });
        } else {
            navigate('/');
        }
    }, [location, navigate, fetchUser]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
                <h4 className="mt-4 fw-bold">Authenticating...</h4>
            </div>
        </Container>
    );
};

export default AuthSuccess;
