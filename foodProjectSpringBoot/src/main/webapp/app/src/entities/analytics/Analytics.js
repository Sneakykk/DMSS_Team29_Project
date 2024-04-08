import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import '../../shared/layout/Analytics.css';  // Import Navbar.css   

const Analytics = () => {
    const [userData, setUserData] = useState(null);
    const [analyticsData, setAnalyticsData] = useState([]);

    const [searchCriteria, setSearchCriteria] = useState({
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            const searchBody = {
                ...searchCriteria,
                userId: userData.employeeId // Assuming employeeId is stored in userData
            };
            fetchAnalyticsData(searchBody);
        }
    }, [userData, searchCriteria]);

    const fetchAnalyticsData = async (searchData) => {
        try {
            const response = await fetch('http://localhost:8080/api/analytics', { // Update to your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData),
            });
            if (response.ok) {
                const data = await response.json();
                setAnalyticsData(data.analytics);
            } else {
                console.error('Failed to fetch analytics data');
            }
        } catch (error) {
            console.error('An error occurred while fetching analytics data:', error);
        }
    };

    const onChangeSearchCriteria = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({
            ...searchCriteria,
            [name]: value
        });
    };

    const searchButton = (e) => {
        e.preventDefault();
        const searchBody = {
            ...searchCriteria,
            userId: userData.employeeId // Assuming employeeId is stored in userData
        };
        fetchAnalyticsData(searchBody);
    };

    return (
        <div>
            <Navbar />
            <div className="analytics-container">
                <div className="search-container">
                    Start Date
                    <input onChange={onChangeSearchCriteria} name="startDate" type="date" placeholder="Start Date" />
                    End Date
                    <input onChange={onChangeSearchCriteria} name="endDate" type="date" placeholder="End Date" />
                    <button onClick={searchButton}>Search</button>
                </div>

                {analyticsData.map((item, index) => (
                    <div key={index} className="analytics-card">
                        <h3>{item.metricName}</h3>
                        {item.metricName === 'Order Volumes' ? (
                            <p>Total Orders: {item.metricValue}</p>
                        ) : item.metricName === 'Popular Menu Items' ? (
                            <ul>
                                {item.metricValue.map((menuItem, idx) => (
                                    <li key={idx}>{menuItem}</li>
                                ))}
                            </ul>
                        ) : item.metricName === 'Peak Ordering Hours' ? (
                            <ul>
                                {item.metricValue.map((hour, idx) => (
                                    <li key={idx}>{hour}</li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;
