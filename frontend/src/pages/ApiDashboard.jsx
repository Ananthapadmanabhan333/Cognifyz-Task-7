import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Activity, Database, ServerCrash, Clock } from 'lucide-react';
import AnalyticsCard from '../components/AnalyticsCard';
import api from '../services/api';
// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ApiDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
                // Fallback dummy data for demo
                setStats({
                    totalCalls: 1542,
                    cachedRequests: 890,
                    failedRequests: 23,
                    avgResponseTime: '120ms'
                });
            }
        };
        fetchStats();
    }, []);

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'API Requests',
                data: [150, 230, 180, 290, 310, 170, 210],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.5)',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false }
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">API Analytics Dashboard</h2>
            
            <Row className="mb-4">
                <Col md={3}>
                    <AnalyticsCard 
                        title="Total API Calls" 
                        value={stats?.totalCalls || 0} 
                        icon={<Activity size={40} />} 
                        color="primary" 
                    />
                </Col>
                <Col md={3}>
                    <AnalyticsCard 
                        title="Cached Requests" 
                        value={stats?.cachedRequests || 0} 
                        icon={<Database size={40} />} 
                        color="success" 
                    />
                </Col>
                <Col md={3}>
                    <AnalyticsCard 
                        title="Failed Requests" 
                        value={stats?.failedRequests || 0} 
                        icon={<ServerCrash size={40} />} 
                        color="danger" 
                    />
                </Col>
                <Col md={3}>
                    <AnalyticsCard 
                        title="Avg Response Time" 
                        value={stats?.avgResponseTime || '0ms'} 
                        icon={<Clock size={40} />} 
                        color="warning" 
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={8} className="mb-4">
                    <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <Card.Body>
                            <h5 className="fw-bold mb-4">Traffic Overview</h5>
                            <div style={{ height: '300px' }} className="d-flex align-items-center justify-content-center">
                                <Line options={chartOptions} data={chartData} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                        <Card.Body className="d-flex flex-column">
                            <h5 className="fw-bold mb-4">System Status</h5>
                            
                            <div className="flex-grow-1 d-flex flex-column justify-content-center gap-4">
                                <div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted fw-bold">API Health</span>
                                        <span className="text-success fw-bold">99.9%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-success" style={{ width: '99.9%' }}></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted fw-bold">Cache Hit Rate</span>
                                        <span className="text-info fw-bold">{(stats?.cachedRequests / stats?.totalCalls * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-info" style={{ width: `${stats?.cachedRequests / stats?.totalCalls * 100}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted fw-bold">Error Rate</span>
                                        <span className="text-danger fw-bold">{(stats?.failedRequests / stats?.totalCalls * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-danger" style={{ width: `${stats?.failedRequests / stats?.totalCalls * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ApiDashboard;
