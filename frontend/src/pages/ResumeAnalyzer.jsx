import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Badge, Alert, Spinner } from 'react-bootstrap';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../services/api';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const res = await api.post('/resume/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error analyzing resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">AI Resume Analyzer</h2>
            <Row>
                <Col lg={5} className="mb-4">
                    <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center p-5 text-center">
                            <UploadCloud size={64} className="text-primary mb-4 opacity-75" />
                            <h5 className="fw-bold mb-3">Upload your Resume</h5>
                            <p className="text-muted small mb-4">PDF, DOCX, or TXT formats (For demo, TXT is preferred)</p>
                            <Form onSubmit={handleUpload} className="w-100">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100 py-2 rounded-pill fw-bold" disabled={!file || loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Analyze Resume'}
                                </Button>
                            </Form>
                            {error && <Alert variant="danger" className="mt-3 w-100 text-start">{error}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col lg={7}>
                    {result ? (
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                            <Card.Body className="p-4">
                                <h4 className="fw-bold mb-4 border-bottom pb-2">Analysis Results</h4>
                                
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                        <h6 className="fw-bold mb-0">Resume Score</h6>
                                        <h3 className={`fw-bold mb-0 text-${result.score > 70 ? 'success' : 'warning'}`}>
                                            {result.score}/100
                                        </h3>
                                    </div>
                                    <ProgressBar 
                                        now={result.score} 
                                        variant={result.score > 70 ? 'success' : 'warning'} 
                                        className="rounded-pill"
                                        style={{ height: '10px' }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">Extracted Skills</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {result.skills.map((skill, index) => (
                                            <Badge bg="info" className="px-3 py-2 rounded-pill text-dark bg-opacity-25 border border-info" key={index}>
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-3">Improvement Suggestions</h6>
                                    <ul className="list-unstyled">
                                        {result.suggestions.map((sug, index) => (
                                            <li key={index} className="mb-2 d-flex align-items-start gap-2 text-muted">
                                                <AlertTriangle size={16} className="text-warning mt-1 flex-shrink-0" />
                                                <span>{sug}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center text-muted border border-dashed rounded-3 bg-light" style={{ minHeight: '300px' }}>
                            <div className="text-center px-4">
                                <CheckCircle size={48} className="mb-3 opacity-25" />
                                <h5>No Analysis Yet</h5>
                                <p>Upload a resume to see AI-powered insights, skill extraction, and scoring.</p>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ResumeAnalyzer;
