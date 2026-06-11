import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Search } from 'lucide-react';
import api from '../services/api';
import GitHubProfile from '../components/GitHubProfile';

const GitHubAnalytics = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!username) return;

        setLoading(true);
        setError(null);
        try {
            const [userRes, repoRes] = await Promise.all([
                api.get(`/github/user/${username}`),
                api.get(`/github/repos/${username}`)
            ]);

            setProfile(userRes.data.data);
            setRepos(repoRes.data.data);
            setAnalytics(repoRes.data.analytics);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching GitHub data');
            setProfile(null);
            setRepos([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">GitHub Analytics</h2>
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <Form onSubmit={handleSearch} className="d-flex shadow-sm rounded-pill overflow-hidden bg-white">
                        <Form.Control
                            type="text"
                            placeholder="Search GitHub Username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-0 shadow-none px-4 py-3"
                            style={{ borderRadius: '0' }}
                        />
                        <Button type="submit" variant="primary" className="px-4 border-0 rounded-0 d-flex align-items-center gap-2">
                            {loading ? <Spinner animation="border" size="sm" /> : <Search size={20} />}
                            <span>Search</span>
                        </Button>
                    </Form>
                </Col>
            </Row>

            {error && <Alert variant="danger" className="text-center rounded-3 shadow-sm">{error}</Alert>}

            {profile && (
                <Row>
                    <Col md={4}>
                        <GitHubProfile profile={profile} repos={repos} />
                    </Col>
                    <Col md={8}>
                        <h4 className="mb-3 fw-bold">Top Languages</h4>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                            {analytics && Object.entries(analytics.languages).sort((a,b) => b[1] - a[1]).map(([lang, count]) => (
                                <span key={lang} className="badge bg-dark px-3 py-2 rounded-pill fs-6">
                                    {lang} <span className="badge bg-secondary ms-2">{count}</span>
                                </span>
                            ))}
                        </div>
                        <h4 className="mb-3 fw-bold">Recent Repositories</h4>
                        <div className="list-group shadow-sm" style={{ borderRadius: '15px' }}>
                            {repos.slice(0, 5).map(repo => (
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" key={repo.id} className="list-group-item list-group-item-action py-3 border-0 border-bottom">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1 fw-bold text-primary">{repo.name}</h6>
                                        <small className="text-muted">⭐ {repo.stargazers_count}</small>
                                    </div>
                                    <p className="mb-1 small text-secondary text-truncate">{repo.description || 'No description available'}</p>
                                </a>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default GitHubAnalytics;
