import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { Compass, BookOpen, Layers } from 'lucide-react';
import api from '../services/api';

const Recommendations = () => {
    const [skillsInput, setSkillsInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);

    const handleGetRecommendations = async (e) => {
        e.preventDefault();
        if (!skillsInput.trim()) return;

        const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(s => s);
        
        setLoading(true);
        setError(null);

        try {
            const res = await api.post('/recommendations', { skills: skillsArray });
            setRecommendations(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error getting recommendations');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">Career Recommendations</h2>
            
            <Row className="mb-5 justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm border-0 bg-primary text-white" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-4 p-md-5">
                            <h4 className="fw-bold mb-3">Tell us your skills</h4>
                            <p className="opacity-75 mb-4">Enter your technical skills separated by commas to get personalized career path recommendations.</p>
                            <Form onSubmit={handleGetRecommendations}>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="e.g. React, Node.js, Python, SQL" 
                                        value={skillsInput}
                                        onChange={(e) => setSkillsInput(e.target.value)}
                                        className="py-3 px-4 border-0 shadow-sm"
                                        style={{ borderRadius: '10px' }}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="light" className="px-4 py-2 fw-bold text-primary" style={{ borderRadius: '8px' }}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Get Recommendations'}
                                </Button>
                            </Form>
                            {error && <Alert variant="light" className="mt-3 text-danger border-0">{error}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {recommendations && (
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', borderTop: '5px solid #0d6efd !important' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4 gap-3 text-primary">
                                    <Compass size={32} />
                                    <h5 className="fw-bold mb-0">Recommended Domains</h5>
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                    {recommendations.domains.map((d, i) => (
                                        <Badge bg="primary" className="p-2 fw-normal" key={i}>{d}</Badge>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', borderTop: '5px solid #198754 !important' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4 gap-3 text-success">
                                    <Layers size={32} />
                                    <h5 className="fw-bold mb-0">Technologies to Learn</h5>
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                    {recommendations.technologies.map((t, i) => (
                                        <Badge bg="success" className="p-2 fw-normal" key={i}>{t}</Badge>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', borderTop: '5px solid #ffc107 !important' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-4 gap-3 text-warning">
                                    <BookOpen size={32} />
                                    <h5 className="fw-bold mb-0 text-dark">Learning Path</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {recommendations.learningPath.map((path, i) => (
                                        <li key={i} className="list-group-item px-0 border-0 d-flex align-items-start gap-2">
                                            <span className="badge bg-warning text-dark rounded-circle">{i+1}</span>
                                            <span>{path}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Recommendations;
