import React, {useEffect,useState} from 'react';
import Layout from '../../Layout';
import cookingImage from '../../shared/images/cooking.jpg'; // Import the image file
import sendingOrdersImage from '../../shared/images/SendingOrders.jpg';
import ReadyToBePickedImage from '../../shared/images/ReadyToBePicked.jpg'

const Dashboard = () => {
    // Access the state passed from the login page
    const [userData, setUserData] = useState([null]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [foods, setFoods] = useState([]);


    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        //console.log(storedUserData)
        if (storedUserData) {
            console.log("test")
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});


            const getFood = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/get_all_foods', {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setFoods(data);
                } catch (error) {
                    console.error('An error occurred: ', error);
                }
            };
    
            getFood();
        }
    }, []);

    useEffect(()=>{
        if(userData){
            if(userData.storeId){
                getOrderStatus();
            }else{
                if(userData.employeeId){
                    getUserOrderStatus();
                }
            }
        }
    },[userData])

    const getUserOrderStatus = async() =>  {

        try {
            const responseOrderStatus = await fetch('http://localhost:8080/api/dashboard/user/get_order_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: userData.employeeId,
            });
    
            const data = await responseOrderStatus.json();
            console.log(data)
            setCurrentOrders([...data])
    
    
        }catch(error){
            console.error('An error occured: ', error);
        }
    }

    const getOrderStatus = async() =>  {

    try {
        const responseOrderStatus = await fetch('http://localhost:8080/api/dashboard/get_order_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData.storeId,
        });

        const data = await responseOrderStatus.json();
        console.log(data)
        setCurrentOrders([...data])


    }catch(error){
        console.error('An error occured: ', error);
    }
}

const updateOrderStatus = async(data) =>  {

    try {
        const responseUpdateOrderStatus = await fetch('http://localhost:8080/api/dashboard/update_order_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // const data = await responseUpdateOrderStatus.json();
        // console.log(data)

    }catch(error){
        console.error('An error occured: ', error);
    }
}

const formatDate = (orderDate) => {
    const date = new Date(orderDate);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    // Format the date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const changeStatus = e =>{
    const {value,name,id} = e.target;

    if(name==="true"){
        console.log(id)
        const updatedOrders = currentOrders.map((order,index) => {
            if (order.orderId === parseInt(id)) {
                console.log(order)
                // Update the status of the order
                const orderStatusArray = order.orderStatus.replace(/[\[\]"]+/g, "").split(",");
                const storeIndex = userData.storeId - 1;
                orderStatusArray[storeIndex] = value;
                const updatedOrderStatus = orderStatusArray.join(",");
                const updatedOrdersWithValue = { ...order, orderStatus: updatedOrderStatus };
                const updatedOrderDateFormat = { ...updatedOrdersWithValue, timeOfOrder: formatDate(updatedOrdersWithValue.timeOfOrder) };
                updateOrderStatus(updatedOrderDateFormat);

                return updatedOrdersWithValue;
            }

            return order;
        });
        setCurrentOrders(updatedOrders)
    }else{
        
        setCurrentOrders(prevOrders => {
            // Find the index of the order with orderId equal to 3
            const orderToUpdateIndex = prevOrders.findIndex(order => order.orderId === parseInt(id));
            console.log(orderToUpdateIndex)
            // Check if the order with orderId equal to 3 exists
            if (orderToUpdateIndex !== -1) {
              // Create a copy of the previous state array
              const updatedOrders = [...prevOrders];
                
              // Update the employeeId of the order
              updatedOrders[orderToUpdateIndex] = {
                ...updatedOrders[orderToUpdateIndex],
                orderStatus: value
              };
      
              // Log the updated order
              console.log("Updated order:", updatedOrders[orderToUpdateIndex]);
              let tempArrToBeSend = updatedOrders[orderToUpdateIndex];
              tempArrToBeSend = {
                ...tempArrToBeSend,
                timeOfOrder: formatDate(tempArrToBeSend.timeOfOrder)
              }
              updateOrderStatus(tempArrToBeSend)
      
              // Return the updated state
              return updatedOrders;
            } else {
              // Order with orderId equal to 3 not found
              console.log(`Order with orderId ${id} not found`);
              return prevOrders; // Return the previous state unchanged
            }
          });
}
}

    const pickUpOrder = e =>{
        const {id} = e.target;

        const updatedOrders = currentOrders.map((order,index) => {
            if (order.orderId === parseInt(id)) {
                console.log(order)
                // Update the status of the order
                const newOrderStatus = {
                    ...order,
                    orderStatus: "Completed"
                }
                console.log(newOrderStatus)
                const updatedOrderDateFormat = { ...newOrderStatus, timeOfOrder: formatDate(newOrderStatus.timeOfOrder) };

                updateOrderStatus(updatedOrderDateFormat);

                return newOrderStatus;
            }

            return order;
        });
        setCurrentOrders(updatedOrders)

    }

    const renderOrderStatus=(order)=>{
        let jsxToReturn;

        switch (order.orderStatus) {
            case "In-Progress":
                jsxToReturn = (
                    <div style={{border: "1px solid black"}}>
                        <p>Time of Order: {formatDate(order.timeOfOrder)}</p>
                        <img src={cookingImage} alt="In-Progress" style={{ width: '200px', height: 'auto' }} />
                        <p>Your Order is cooking now. Thank you for your patience</p>
                    </div>
                );
                break;
            case "Sending Orders":
                jsxToReturn = (
                    <div style={{border: "1px solid black"}}>
                    <p>Time of Order: {formatDate(order.timeOfOrder)}</p>
                    <img src={sendingOrdersImage} alt="In-Progress" style={{ width: '200px', height: 'auto' }} />
                    <p>Your order is being sent to the kitchen</p>
                </div>
                );
                break;
            case "Ready To Be Picked":
                    jsxToReturn = (
                    <div style={{border: "1px solid black"}}>
                            <p>Time of Order: {formatDate(order.timeOfOrder)}</p>
                            <img src={ReadyToBePickedImage} alt="In-Progress" style={{ width: '200px', height: 'auto' }} />
                            <p>Your order ready to be collected!</p>
                            <button onClick={pickUpOrder} id={order.orderId}>Pick up</button>
                    </div>
                    );
                    break;
            default:
                jsxToReturn = null; // Handle any other cases or edge cases
        }

        return jsxToReturn;
    }

    const renderMixedStoresOrderStatus = (order) =>{
        const storeOneArr = [];
        const storeTwoArr = [];
        const itemsArrString = order.itemName;
        const itemArray = JSON.parse(itemsArrString);
        const orderStatus = order.orderStatus.split(",");
        const arrayToDisplayStoreOne = [];
        const arrayToDisplayStoreTwo = [];

        console.log(itemArray[0])

        if (parseInt(foods.length) !== 0) {
            foods.forEach((food, index) => {
                if (food.storeId === 1) {
                    storeOneArr.push(food);
                } else if (food.storeId === 2) {
                    storeTwoArr.push(food);
                }
            });
        }
        
        itemArray.forEach(item=>{
            if (storeOneArr.includes(item)) {
                arrayToDisplayStoreOne.push(item)
            }else if(storeTwoArr.includes(item)){
                arrayToDisplayStoreTwo.push(item)
            }
        })


        return(
            <div style={{border: "1px solid black"}}>
                <p>Time of Order: {formatDate(order.timeOfOrder)}</p>

        

                {orderStatus.some(status => status === "Ready To Be Picked") ? (
                    // JSX code to render when at least one element is "Ready To Be Picked"
                    <>
                        <div>
                            {(orderStatus[0] === "Ready To Be Picked")?
                            <>
                                Store A orderStatus: In-Progress
                            </>:
                            <>
                                Store A orderStatus: {orderStatus[0]}
                            </>}
                            
                        </div>
                        <div>
                            {(orderStatus[1] === "Ready To Be Picked")?
                            <>
                                Store B orderStatus: In-Progress
                            </>:
                            <>
                                Store B orderStatus: {orderStatus[1]}
                            </>}
                            
                        </div>
                    </>
                ) : orderStatus.every(status => status !== "Ready To Be Picked") ? (
                    // JSX code to render when neither of the elements is "Ready To Be Picked"
                    <>
                        <div>
                            Store A orderStatus: {orderStatus[0]}
                        </div>
                        <div>
                            Store B orderStatus: {orderStatus[1]}
                        </div>
                    </>
                ) : (
                    // JSX code to render when some elements are "Ready To Be Picked" and some are not
                    <>
                        <div>
                            Store A orderStatus: {orderStatus[0]}
                        </div>
                        <div>
                            Store B orderStatus: {orderStatus[1]}
                        </div>
                    </>
                )}
                
                {orderStatus[0] === "Ready To Be Picked" && orderStatus[1] === "Ready To Be Picked" && (
                    <button onClick={pickUpOrder} id={order.orderId}>Pick up</button>
                )}
            </div>
        )
    }

    return (
        <Layout>
            <div>
                <h2>Dashboard</h2>
                <p>Welcome to your dashboard!</p>
                <p>User Information:</p>
                    <p>Name: {userData?.username}</p>
                    <p>Email: {userData?.employeeId}</p>
            </div>

            {userData.storeId?(
                <>
                    <h1>Store Owner</h1>
                    <h1>Current Orders</h1>
                    <table>
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Orders</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Time of Order</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentOrders?.map((order, index) => {
                        
                        const orderStatusArray = order.orderStatus.replace(/[\[\]"]+/g, "").split(",");
                        const storeIndex = userData.storeId - 1;
                        const statusForStore = orderStatusArray[storeIndex];
                        return(
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {order.itemName.replace(/[[\]]/g, '').split(",").map((item, i) => (
                                    <div key={i}>{i + 1}: {item.replace(/['"]/g, '').trim()}</div>
                                ))}
                            </td>
                            <td>
                                {/* Split the quantity string into an array and map over it */}
                                {order.quantity.replace(/[[\]]/g, '').split(",").map((item, i) => (
                                    <div key={i}> x{item.trim()}</div>
                                ))}
                            </td>
                            <td>${order.totalBill}</td>
                            <td>{formatDate(order.timeOfOrder)}</td>
                            <td>
                                <select onChange={changeStatus} id={order.orderId} name={order.mixedStores.toString()} value={statusForStore}>
                                    <option value="In-Progress">In-Progress</option>
                                    <option value="Sending Orders">Sending Orders</option>
                                    <option value="Completed">Completed</option>

                                </select>
                            </td>

                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </>
            )
        :
        (
            currentOrders?.map((order, index) => (
                <div key={index}>
                    {order.mixedStores && order.orderStatus !== "Completed" ? (
                        <>
                            {renderMixedStoresOrderStatus(order)}
                        </>
                    ) : (
                        <>
                            {renderOrderStatus(order)}
                        </>
                    )}
                </div>
            ))
        )}
        </Layout>
    );
};

export default Dashboard;
