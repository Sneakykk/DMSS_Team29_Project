import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import cookingImage from "../../shared/images/cooking.jpg"; // Import the image file
import sendingOrdersImage from "../../shared/images/SendingOrders.jpg";
import ReadyToBePickedImage from "../../shared/images/ReadyToBePicked.jpg";

const Dashboard = () => {
  // Access the state passed from the login page
  const [userData, setUserData] = useState([null]);
  const [currentOrders, setCurrentOrders] = useState([]);
  // const [setFoods] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    //console.log(storedUserData)
    if (storedUserData) {
      console.log("test");
      const parsedUserData = JSON.parse(storedUserData);
      setUserData({ ...parsedUserData });

      // const getFood = async () => {
      //     try {
      //         const response = await fetch('http://localhost:8080/api/get_all_foods', {
      //             method: 'get',
      //             headers: {
      //                 'Content-Type': 'application/json',
      //             },
      //         });
      //         const data = await response.json();
      //         setFoods(data);
      //     } catch (error) {
      //         console.error('An error occurred: ', error);
      //     }
      // };

      // getFood();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.storeId) {
        getOrderStatus();
      } else {
        if (userData.employeeId) {
          getUserOrderStatus();
        }
      }
    }
    // eslint-disable-next-line
  }, [userData]);

  const getUserOrderStatus = async () => {
    try {
      const responseOrderStatus = await fetch(
        "https://152.42.233.119:8443/api/dashboard/user/get_order_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData.employeeId,
        }
      );

      const data = await responseOrderStatus.json();
      console.log("I am now in the getUserOrderStatus. The data is : ", data);
      setCurrentOrders([...data]);
    } catch (error) {
      console.error("An error occured: ", error);
    }
  };

  const getOrderStatus = async () => {
    try {
      const responseOrderStatus = await fetch(
        "https://152.42.233.119:8443/api/dashboard/get_order_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData.storeId,
        }
      );

      const data = await responseOrderStatus.json();
      console.log("The current data details are: ", data);
      setCurrentOrders([...data]);
    } catch (error) {
      console.error("An error occured: ", error);
    }
  };

  const updateOrderStatus = async (data) => {
    try {
      console.log("Inside updateOrderStatus. data is: ", data);
      const originalTime = new Date(data.timeOfOrder);
      console.log(
        `The original time of order in updateOrderStatus is: ${originalTime}`
      );

      // Subtract 8 hours (8 * 60 * 60 * 1000 milliseconds) from the timeOfOrder
      const updatedTime = new Date(
        originalTime.getTime() - 12 * 60 * 60 * 1000
      );
      console.log(
        `The updated time of order in updateOrderStatus is: ${updatedTime}`
      );

      // Format the updatedTimeOfOrder back to the desired format ("YYYY-MM-DD HH:mm:ss")
      const formattedAdjustedTime = `${updatedTime.getFullYear()}-${String(
        updatedTime.getMonth() + 1
      ).padStart(2, "0")}-${String(updatedTime.getDate()).padStart(
        2,
        "0"
      )} ${String(updatedTime.getHours()).padStart(2, "0")}:${String(
        updatedTime.getMinutes()
      ).padStart(2, "0")}:${String(updatedTime.getSeconds()).padStart(2, "0")}`;

      const adjustedData = {
        ...data,
        timeOfOrder: formattedAdjustedTime,
      };

      //eslint-disable-next-line
      const responseUpdateOrderStatus = await fetch(
        "https://152.42.233.119:8443/api/dashboard/update_order_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(data),
          body: JSON.stringify(adjustedData),
        }
      );

      // const data = await responseUpdateOrderStatus.json();
      // console.log(data)
    } catch (error) {
      console.error("An error occured: ", error);
    }
  };

  const formatDate = (orderDate) => {
    const date = new Date(orderDate);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    console.log(
      `Inside formateDate(). the date is: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    );
    // Format the date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const changeStatus = (e) => {
    const { value, name, id } = e.target;

    if (name === "true") {
      console.log(id);
      const updatedOrders = currentOrders.map((order, index) => {
        if (order.orderId === parseInt(id)) {
          console.log(order);
          // Update the status of the order
          // eslint-disable-next-line
          const orderStatusArray = order.orderStatus
            .replace(/[\[\]"]+/g, "")
            .split(",");
          const storeIndex = userData.storeId - 1;
          orderStatusArray[storeIndex] = value;
          const updatedOrderStatus = orderStatusArray.join(",");
          const updatedOrdersWithValue = {
            ...order,
            orderStatus: updatedOrderStatus,
          };
          console.log(
            `I am in the changeStatus(). updatedOrdersWithValue.timeOfOrder: ${updatedOrdersWithValue.timeOfOrder}`
          );
          const updatedOrderDateFormat = {
            ...updatedOrdersWithValue,
            timeOfOrder: formatDate(updatedOrdersWithValue.timeOfOrder),
          };

          updateOrderStatus(updatedOrderDateFormat);

          return updatedOrdersWithValue;
        }

        return order;
      });
      setCurrentOrders(updatedOrders);
    } else {
      console.log("I am in the else statement instead.");
      setCurrentOrders((prevOrders) => {
        // Find the index of the order with orderId equal to 3
        const orderToUpdateIndex = prevOrders.findIndex(
          (order) => order.orderId === parseInt(id)
        );
        console.log(orderToUpdateIndex);
        // Check if the order with orderId equal to 3 exists
        if (orderToUpdateIndex !== -1) {
          // Create a copy of the previous state array
          const updatedOrders = [...prevOrders];

          // Update the employeeId of the order
          updatedOrders[orderToUpdateIndex] = {
            ...updatedOrders[orderToUpdateIndex],
            orderStatus: value,
          };

          // const originalTimeOfOrder = new Date(
          //   updatedOrders[orderToUpdateIndex].timeOfOrder
          // );
          // console.log(`The original time of order is: ${originalTimeOfOrder}`);

          // const updatedTimeOfOrder = new Date(
          //   originalTimeOfOrder.getTime() - 8 * 60 * 60 * 1000
          // );
          // console.log(`The updated time of order is: ${updatedTimeOfOrder}`);

          // const formattedAdjustedTimeOfOrder = `${updatedTimeOfOrder.getFullYear()}-${String(
          //   updatedTimeOfOrder.getMonth() + 1
          // ).padStart(2, "0")}-${String(updatedTimeOfOrder.getDate()).padStart(
          //   2,
          //   "0"
          // )} ${String(updatedTimeOfOrder.getHours()).padStart(2, "0")}:${String(
          //   updatedTimeOfOrder.getMinutes()
          // ).padStart(2, "0")}:${String(
          //   updatedTimeOfOrder.getSeconds()
          // ).padStart(2, "0")}`;
          // console.log(
          //   `The formatted updated time is: ${formattedAdjustedTimeOfOrder}`
          // );

          // updatedOrders[orderToUpdateIndex].timeOfOrder =
          //   formattedAdjustedTimeOfOrder;
          console.log("Updated order:", updatedOrders[orderToUpdateIndex]);
          let tempArrToBeSend = updatedOrders[orderToUpdateIndex];
          tempArrToBeSend = {
            ...tempArrToBeSend,
            timeOfOrder: formatDate(tempArrToBeSend.timeOfOrder),
          };
          //console.log(`The updated time is: ${tempArrToBeSend.timeOfOrder}`);
          updateOrderStatus(tempArrToBeSend);

          // Return the updated state
          return updatedOrders;
        } else {
          // Order with orderId equal to 3 not found
          console.log(`Order with orderId ${id} not found`);
          return prevOrders; // Return the previous state unchanged
        }
      });
    }
  };

  const pickUpOrder = (e) => {
    const { id } = e.target;

    const updatedOrders = currentOrders.map((order, index) => {
      if (order.orderId === parseInt(id)) {
        console.log(order);
        // Update the status of the order
        const newOrderStatus = {
          ...order,
          orderStatus: "Completed",
        };
        console.log(newOrderStatus);

        const originalTimeOfNewOrder = new Date(newOrderStatus.timeOfOrder);
        console.log(
          `The original time of newOrderStatus is: ${originalTimeOfNewOrder}`
        );

        const updatedTimeOfNewOrder = new Date(
          originalTimeOfNewOrder.getTime() + 4 * 60 * 60 * 1000
        );
        console.log(
          `The updated time of new order is: ${updatedTimeOfNewOrder}`
        );

        const formattedAdjustedTimeOfNewOrder = `${updatedTimeOfNewOrder.getFullYear()}-${String(
          updatedTimeOfNewOrder.getMonth() + 1
        ).padStart(2, "0")}-${String(updatedTimeOfNewOrder.getDate()).padStart(
          2,
          "0"
        )} ${String(updatedTimeOfNewOrder.getHours()).padStart(
          2,
          "0"
        )}:${String(updatedTimeOfNewOrder.getMinutes()).padStart(
          2,
          "0"
        )}:${String(updatedTimeOfNewOrder.getSeconds()).padStart(2, "0")}`;
        console.log(
          `The formatted updated time of new order is: ${formattedAdjustedTimeOfNewOrder}`
        );

        newOrderStatus.timeOfOrder = formattedAdjustedTimeOfNewOrder;

        const updatedOrderDateFormat = {
          ...newOrderStatus,
          // timeOfOrder: formatDate(newOrderStatus.timeOfOrder),
          timeOfOrder: newOrderStatus.timeOfOrder,
        };

        updateOrderStatus(updatedOrderDateFormat);

        return newOrderStatus;
      }

      return order;
    });
    setCurrentOrders(updatedOrders);
  };

  const renderOrderStatus = (order) => {
    return (
      <>
        <p>Order Date: {formatDate(order.timeOfOrder)}</p>
        <p>Order ID: {order.orderId}</p>

        <div className="status-row" key={order.orderId}>
          <div
            className={`status-card sending-orders ${
              order.orderStatus === "Sending Orders" ? "active" : "inactive"
            }`}
          >
            <p>Sending Orders</p>
            <img
              src={sendingOrdersImage}
              alt="Sending Orders"
              style={{ width: "200px", height: "auto" }}
            />
            <p>Your Order is cooking now. Thank you for your patience</p>
          </div>
          <div
            className={`status-card in-progress ${
              order.orderStatus === "In-Progress" ? "active" : "inactive"
            }`}
          >
            <p>In-Progress</p>
            <img
              src={cookingImage}
              alt="In-Progress"
              style={{ width: "200px", height: "auto" }}
            />
            <p>Your order is being sent to the kitchen</p>
          </div>
          <div
            className={`status-card ready-to-be-picked ${
              order.orderStatus === "Ready To Be Picked" ? "active" : "inactive"
            }`}
          >
            <p>Ready to be Picked</p>
            {order.orderStatus === "Ready To Be Picked" && (
              <div className="ready-to-be-picked-content">
                <img
                  src={ReadyToBePickedImage}
                  alt="Ready To Be Picked"
                  style={{ width: "200px", height: "auto" }}
                />
                <p>Your order is ready to be collected!</p>
                <button onClick={pickUpOrder} id={order.orderId}>
                  Pick up
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderMixedStoresOrderStatus = (order) => {
    const orderStatus = order.orderStatus.split(",");

    // Define the ranking
    // const ranking = ["Ready To Be Picked", "In-Progress", "Sending Orders"];
    const ranking = ["Sending Orders", "In-Progress", "Ready To Be Picked"];

    // Find the index of the lowest ranking item
    const lowestIndex = orderStatus.reduce((acc, status) => {
      const index = ranking.indexOf(status);
      if (index !== -1 && index < acc) {
        return index;
      }
      return acc;
    }, ranking.length);

    // Get the lowest ranking item
    const lowestStatus = ranking[lowestIndex];

    // Render different content based on the lowest ranking status
    return (
      <>
        <p>Order Date: {formatDate(order.timeOfOrder)}</p>
        <p>Order ID: {order.orderId}</p>
        <div className="status-row">
          <div
            className={`status-card sending-orders ${
              lowestStatus === "Sending Orders" ? "active" : "inactive"
            }`}
          >
            <p>Sending Orders</p>
            <img
              src={sendingOrdersImage}
              alt="Sending Orders"
              style={{ width: "200px", height: "auto" }}
            />
            <p>Your Order is cooking now. Thank you for your patience</p>
          </div>
          <div
            className={`status-card in-progress ${
              lowestStatus === "In-Progress" ? "active" : "inactive"
            }`}
          >
            <p>In-Progress</p>
            <img
              src={cookingImage}
              alt="In-Progress"
              style={{ width: "200px", height: "auto" }}
            />
            <p>Your order is being sent to the kitchen</p>
          </div>
          <div
            className={`status-card ready-to-be-picked ${
              lowestStatus === "Ready To Be Picked" ? "active" : "inactive"
            }`}
          >
            <p>Ready to be Picked</p>
            {lowestStatus === "Ready To Be Picked" && (
              <div className="ready-to-be-picked-content">
                <img
                  src={ReadyToBePickedImage}
                  alt="Ready To Be Picked"
                  style={{ width: "200px", height: "auto" }}
                />
                <p>Your order is ready to be collected!</p>
                <button onClick={pickUpOrder} id={order.orderId}>
                  Pick up
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <div className="card-container">
        <h2>Dashboard</h2>
        <div>
          <p>Name: {userData?.username}</p>
          <p>Employee ID: {userData?.employeeId}</p>
        </div>
        {!userData.storeId && <h3>Here is your Order Status</h3>}
      </div>

      {userData.storeId ? (
        <>
          <h1 className="text-center">Current Orders</h1>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Orders</th>
                <th>Qty</th>
                <th>Price($)</th>
                <th>Time of Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders?.map((order, index) => {
                // eslint-disable-next-line
                const orderStatusArray = order.orderStatus
                  .replace(/[\[\]"]+/g, "")
                  .split(",");
                const storeIndex = userData.storeId - 1;
                const statusForStore = orderStatusArray[storeIndex];
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {order.itemName
                        .replace(/[[\]]/g, "")
                        .split(",")
                        .map((item, i) => (
                          <div key={i}>
                            {i + 1}: {item.replace(/['"]/g, "").trim()}
                          </div>
                        ))}
                    </td>
                    <td>
                      {/* Split the quantity string into an array and map over it */}
                      {order.quantity
                        .replace(/[[\]]/g, "")
                        .split(",")
                        .map((item, i) => (
                          <div key={i}> x{item.trim()}</div>
                        ))}
                    </td>
                    <td>${order.totalBill}</td>
                    <td>{formatDate(order.timeOfOrder)}</td>
                    <td>
                      <select
                        onChange={changeStatus}
                        id={order.orderId}
                        name={order.mixedStores.toString()}
                        value={statusForStore}
                      >
                        <option value="In-Progress">In-Progress</option>
                        <option value="Sending Orders">Sending Orders</option>
                        <option value="Ready To Be Picked">
                          Ready To Be Picked
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="order-grid">
          {currentOrders?.map((order, index) => (
            <div key={index}>
              {order.mixedStores && order.orderStatus !== "Completed" ? (
                <>{renderMixedStoresOrderStatus(order)}</>
              ) : (
                <>{renderOrderStatus(order)}</>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
