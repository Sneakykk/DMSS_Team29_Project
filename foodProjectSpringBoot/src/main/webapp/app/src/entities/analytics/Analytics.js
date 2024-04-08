import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import '../../shared/layout/Analytics.css'; // Import Analytics.css for styling

const Analytics = () => {
    const [userData, setUserData] = useState(null);
    const [analyticsData, setAnalyticsData] = useState({
        "orderVolume": 0,
        "popularMenuItem": [],
        "peakOrderingHours": []
    });

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
    }, [userData]);

    const fetchAnalyticsData = async (searchData) => {
        try {
            const responseOrderVolume = await fetch('http://localhost:8080/api/analytics/order_volume', { // Update to your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...searchData, storeId: 1}),
            });
            if (responseOrderVolume.ok) {
                const orderVolumeData  = await responseOrderVolume.json();
                console.log(orderVolumeData )
                setAnalyticsData(prevData => ({
                     ...prevData,
                      "orderVolume": orderVolumeData  
                }));

            } else {
                console.error('Failed to fetch analytics data');
            }

            const responsePopularItems = await fetch('http://localhost:8080/api/analytics/popular_items', { // Update to your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...searchData, storeId: 1}),
                });
            if (responsePopularItems.ok) {
                const popularItemsData  = await responsePopularItems.text();
                console.log(JSON.parse(popularItemsData ))
                setAnalyticsData(prevData => ({
                     ...prevData,
                    "popularMenuItem": JSON.parse(popularItemsData )  
                    }));

            } else {
                console.error('Failed to fetch analytics data');
            }
        
            const responsePeakHour = await fetch('http://localhost:8080/api/analytics/peak_ordering_hours', { // Update to your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...searchData, storeId: 1}),
                });
            if (responsePeakHour.ok) {
                const peakHourData  = await responsePeakHour.json();
                console.log(peakHourData )
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
        console.log(searchBody)
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
                {/* {analyticsData} */}
                <div className="cards-container">
                    <div className="analytics-card">
                        <h3>Order Volume</h3>
                        <p>Total Orders: {analyticsData.orderVolume}</p>
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
                        <ul>
                            {analyticsData.peakOrderingHours.map((data, index) => (
                                <li key={index}>{data.Datetime}: {data.orders}</li>
                            ))}
                        </ul>
                    </div>
                    {/* {analyticsData.map((item, index) => (
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
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
