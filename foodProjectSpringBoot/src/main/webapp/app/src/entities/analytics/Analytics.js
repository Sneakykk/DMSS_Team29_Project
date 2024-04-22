import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../../Navbar";
import Chart from "chart.js/auto";
import "../../shared/layout/Analytics.css"; // Import Analytics.css for styling

const Analytics = () => {
  const [userData, setUserData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    orderVolume: 0,
    totalOrderAmount: 0,
    popularMenuItem: [],
    peakOrderingHours: [],
  });

  const [searchCriteria, setSearchCriteria] = useState({
    startDate: "",
    endDate: "",
  });

  const [peakOrderChart, setPeakOrderChart] = useState(null);

  const prevSearchCriteriaRef = useRef(null);

  const fetchAnalyticsData = useCallback(
    async (searchData) => {
      try {
        const responseOrderVolume = await fetch(
          "https://152.42.233.119:8443/api/analytics/order_volume",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
          }
        );
        if (responseOrderVolume.ok) {
          const orderVolumeData = await responseOrderVolume.text();
          setAnalyticsData((prevData) => ({
            ...prevData,
            totalOrderAmount: JSON.parse(orderVolumeData).totalAmount,
            orderVolume: JSON.parse(orderVolumeData).totalVolume,
          }));
        } else {
          console.error("Failed to fetch analytics data");
        }

        const responsePopularItems = await fetch(
          "https://152.42.233.119:8443/api/analytics/popular_items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
          }
        );
        if (responsePopularItems.ok) {
          const popularItemsData = await responsePopularItems.text();
          setAnalyticsData((prevData) => ({
            ...prevData,
            popularMenuItem: JSON.parse(popularItemsData),
          }));
        } else {
          console.error("Failed to fetch analytics data");
        }

        const responsePeakHour = await fetch(
          "https://152.42.233.119:8443/api/analytics/peak_ordering_hours",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...searchData, storeId: userData.storeId }),
          }
        );
        if (responsePeakHour.ok) {
          const peakHourData = await responsePeakHour.json();
          peakHourData.sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
          setAnalyticsData((prevData) => ({
            ...prevData,
            peakOrderingHours: peakHourData,
          }));
        } else {
          console.error("Failed to fetch analytics data");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching analytics data:",
          error
        );
      }
    },
    [userData]
  );

  const updatePeakOrderChart = useCallback(() => {
    const ctx = document.getElementById("peakOrderChart").getContext("2d");

    // Immediately destroy existing chart instance if it exists
    if (peakOrderChart) {
      peakOrderChart.destroy();
    }

    // Assuming analyticsData.peakOrderingHours might have been updated
    const labels = [];
    for (let hour = 8; hour <= 18; hour++) {
      labels.push(`${hour < 10 ? "0" + hour : hour}:00`);
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Peak Ordering Hours",
            data: analyticsData.peakOrderingHours.map(
              (data) => data.averageOrders
            ),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (24-hour format)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Orders",
            },
            beginAtZero: true,
          },
        },
      },
    });

    setPeakOrderChart(newChart);
    // eslint-disable-next-line
  }, [analyticsData.peakOrderingHours]);

  useEffect(() => {
    // Retrieve user data from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const searchBody = {
        ...searchCriteria,
        userId: userData.employeeId, // Assuming employeeId is stored in userData
      };
      fetchAnalyticsData(searchBody);
    }
    // eslint-disable-next-line
  }, [userData, fetchAnalyticsData]); // Include fetchAnalyticsData in the dependency array

  useEffect(() => {
    prevSearchCriteriaRef.current = searchCriteria;
  });

  useEffect(() => {
    if (prevSearchCriteriaRef.current !== searchCriteria) {
      const searchBody = {
        ...searchCriteria,
        userId: userData.employeeId, // Assuming employeeId is stored in userData
      };
      fetchAnalyticsData(searchBody);
    }
  }, [userData, searchCriteria, fetchAnalyticsData]);

  useEffect(() => {
    if (analyticsData.peakOrderingHours.length > 0) {
      updatePeakOrderChart();
    }
  }, [analyticsData.peakOrderingHours, updatePeakOrderChart]);

  const onChangeSearchCriteria = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevSearchCriteria) => ({
      ...prevSearchCriteria,
      [name]: value,
    }));
  };

  const searchButton = (e) => {
    e.preventDefault();
    const searchBody = {
      ...searchCriteria,
      userId: userData.employeeId, // Assuming employeeId is stored in userData
    };
    fetchAnalyticsData(searchBody);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar />
      <div className="analytics-container">
        <div className="search-container">
          Start Date
          <input
            onChange={onChangeSearchCriteria}
            name="startDate"
            type="date"
            placeholder="Start Date"
            max={getCurrentDate()}
          />
          End Date
          <input
            onChange={onChangeSearchCriteria}
            name="endDate"
            type="date"
            placeholder="End Date"
            max={getCurrentDate()}
          />
          <button className="search-button" onClick={searchButton}>
            Search
          </button>
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
                    <li key={index}>
                      {itemName}: {count}
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </div>

          <div className="analytics-card">
            <h3>Peak Ordering Hours</h3>
            <div className="chart-container">
              <canvas id="peakOrderChart" width="1000" height="1000"></canvas>
            </div>
            {/* <ul>
                            {analyticsData.peakOrderingHours.map((data, index) => (
                                <li key={index}>{data.hour}: {data.averageOrders}</li>
                            ))}
                        </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
