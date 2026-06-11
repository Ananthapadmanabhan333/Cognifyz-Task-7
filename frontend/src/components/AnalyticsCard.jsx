import React from 'react';
import { Card } from 'react-bootstrap';

const AnalyticsCard = ({ title, value, icon, color = 'primary' }) => {
    return (
        <Card className={`text-white bg-${color} mb-3 shadow-sm`} style={{ border: 'none', borderRadius: '15px' }}>
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                    <h6 className="card-title text-uppercase text-white-50">{title}</h6>
                    <h2 className="mb-0 fw-bold">{value}</h2>
                </div>
                {icon && <div className="display-4 opacity-50">{icon}</div>}
            </Card.Body>
        </Card>
    );
};

export default AnalyticsCard;
