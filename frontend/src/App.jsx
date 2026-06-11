import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import AuthSuccess from './pages/AuthSuccess';
import ApiDashboard from './pages/ApiDashboard';
import GitHubAnalytics from './pages/GitHubAnalytics';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Recommendations from './pages/Recommendations';
import api from './services/api';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Layers, Shield, Zap } from 'lucide-react';

const Home = ({ user }) => {
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Container className="py-5 text-center">
            <h1 className="display-4 fw-bold mb-4 text-primary">Welcome to InternHub</h1>
            <p className="lead text-muted mb-5 max-w-2xl mx-auto" style={{ maxWidth: '800px' }}>
                Advanced API Usage & Integration Platform. Sign in to access GitHub analytics, AI-powered resume analysis, and intelligent career recommendations.
            </p>
            
            <Row className="g-4 justify-content-center mt-5">
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                        <Zap size={48} className="text-warning mb-3 mx-auto" />
                        <h4 className="fw-bold">Fast & Cached</h4>
                        <p className="text-muted">Redis caching implementation for lightning-fast external API responses.</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                        <Shield size={48} className="text-success mb-3 mx-auto" />
                        <h4 className="fw-bold">Secure</h4>
                        <p className="text-muted">OAuth 2.0 authentication, rate limiting, and JWT protected routes.</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                        <Layers size={48} className="text-primary mb-3 mx-auto" />
                        <h4 className="fw-bold">AI Powered</h4>
                        <p className="text-muted">Leveraging advanced LLMs for resume parsing and skill gap analysis.</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return (
        <Router>
            <div className="bg-light min-vh-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Navigation user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/auth/success" element={<AuthSuccess fetchUser={fetchUser} />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={user ? <ApiDashboard /> : <Navigate to="/" />} />
                    <Route path="/github" element={user ? <GitHubAnalytics /> : <Navigate to="/" />} />
                    <Route path="/resume" element={user ? <ResumeAnalyzer /> : <Navigate to="/" />} />
                    <Route path="/recommendations" element={user ? <Recommendations /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
