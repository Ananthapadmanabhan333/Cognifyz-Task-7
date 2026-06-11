import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

const GitHubProfile = ({ profile, repos }) => {
    if (!profile) return null;

    return (
        <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ height: '100px', background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)' }}></div>
            <Card.Body className="text-center position-relative" style={{ marginTop: '-50px' }}>
                <img 
                    src={profile.avatar_url} 
                    alt="avatar" 
                    className="rounded-circle border border-4 border-white mb-3" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h4 className="fw-bold">{profile.name || profile.login}</h4>
                <p className="text-muted">@{profile.login}</p>
                <p>{profile.bio}</p>
                
                <Row className="mt-4 text-center">
                    <Col>
                        <h5 className="fw-bold">{profile.followers}</h5>
                        <span className="text-muted small">Followers</span>
                    </Col>
                    <Col>
                        <h5 className="fw-bold">{profile.following}</h5>
                        <span className="text-muted small">Following</span>
                    </Col>
                    <Col>
                        <h5 className="fw-bold">{profile.public_repos}</h5>
                        <span className="text-muted small">Repos</span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default GitHubProfile;
