import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import Chart from 'chart.js/auto';
import '../../shared/layout/Analytics.css'; // Import Analytics.css for styling

const Analytics = () => {
    const [userData, setUserData] = useState(null);
    const [analyticsData, setAnalyticsData] = useState({
        "orderVolume": 0,
        "totalOrderAmount": 0,
        "popularMenuItem": [],
        "peakOrderingHours": []
    });

    const [searchCriteria, setSearchCriteria] = useState({
        startDate: "",
        endDate: ""
    });

    const [peakOrderChart, setPeakOrderChart] = useState(null);

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
    }, [userData]);

    const fetchAnalyticsData = async (searchData) => {
        try {
            const responseOrderVolume = await fetch('http://localhost:8080/api/analytics/order_volume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
            });
            if (responseOrderVolume.ok) {
                const orderVolumeData = await responseOrderVolume.text();
                console.log()
                setAnalyticsData(prevData => ({
                    ...prevData,
                    "totalOrderAmount":(JSON.parse(orderVolumeData)).totalAmount,
                    "orderVolume": (JSON.parse(orderVolumeData)).totalVolume
                }));
            } else {
                console.error('Failed to fetch analytics data');
            }

            const responsePopularItems = await fetch('http://localhost:8080/api/analytics/popular_items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
            });
            if (responsePopularItems.ok) {
                const popularItemsData = await responsePopularItems.text();
                setAnalyticsData(prevData => ({
                    ...prevData,
                    "popularMenuItem": JSON.parse(popularItemsData)
                }));
            } else {
                console.error('Failed to fetch analytics data');
            }

            const responsePeakHour = await fetch('http://localhost:8080/api/analytics/peak_ordering_hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
            });
            if (responsePeakHour.ok) {
                const peakHourData = await responsePeakHour.json();
                setAnalyticsData(prevData => ({
                    ...prevData,
                    "peakOrderingHours": peakHourData
                }));
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

    const updatePeakOrderChart = () => {
        const ctx = document.getElementById('peakOrderChart');
        if (!ctx) return; // If canvas element does not exist, return

        // Check if peakOrderChart instance exists
        if (peakOrderChart) {
            peakOrderChart.destroy(); // Destroy the previous chart
        }

        // Create a new chart instance
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: analyticsData.peakOrderingHours.map(data => data.datetime),
                datasets: [
                    {
                        label: 'Peak Ordering Hours',
                        data: analyticsData.peakOrderingHours.map(data => data.orders),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setPeakOrderChart(newChart);
    };

    useEffect(() => {
        if (analyticsData.peakOrderingHours.length > 0) {
            updatePeakOrderChart();
        }
    }, [analyticsData.peakOrderingHours]);

    return (
        <div>
            <Navbar />
            <div className="analytics-container">
                <div className="search-container">
                    Start Date
                    <input onChange={onChangeSearchCriteria} name="startDate" type="date" placeholder="Start Date" />
                    End Date
                    <input onChange={onChangeSearchCriteria} name="endDate" type="date" placeholder="End Date" />
                    <button className="search-button" onClick={searchButton}>Search</button>
                </div>
                {/* {analyticsData} */}
                <div className="cards-container">
                    <div className="analytics-card">
                        <h3>Order Volume</h3>
                        <p>Total Orders: {analyticsData.orderVolume}</p>
                    </div>

                    <div className="analytics-card">
                        <h3>Total Order Amount</h3>
                        <p>Total Amount: {analyticsData.totalOrderAmount}</p>
                    </div>

                    <div className="analytics-card">
                        <h3>Popular Menu Items</h3>
                        <ul>
                            {analyticsData.popularMenuItem?.map((item, index) => (
                                <div key={index}>
                                    {Object.entries(item).map(([itemName, count]) => (
                                        <li key={index}>{itemName}: {count}</li>
                                    ))}
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="analytics-card">
                        <h3>Peak Ordering Hours</h3>
                        <div className="chart-container">
                            <canvas id="peakOrderChart" width="400" height="200"></canvas>
                        </div>
                        <ul>
                            {analyticsData.peakOrderingHours.map((data, index) => (
                                <li key={index}>{data.datetime}: {data.orders}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
