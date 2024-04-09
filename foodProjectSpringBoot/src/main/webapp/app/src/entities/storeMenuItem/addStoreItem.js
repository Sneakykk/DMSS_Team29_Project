import React, {useState,useEffect} from 'react';
import Navbar from '../../Navbar';
import '../../shared/layout/StoreMenuItem.css';

const StoreMenuPage = () => {

    const [userData, setUserData] = useState([null]);
    const [foodDetails, setFoodDetails] = useState({
        "foodName": "",
        "foodPrice": "",
        "foodType": "",
        "storeId": ""
    });


    useEffect(()=>{
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
  
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});
            setFoodDetails({
                ...foodDetails,
                "storeId": userData.storeId
            })
        }
    },[])

    useEffect(()=>{
        if(userData){
            setFoodDetails({
                ...foodDetails,
                "storeId": userData.storeId
            })
        }
    }, [userData])

    const onChangeHandler = e =>{
        const {value,id} = e.target;
        setFoodDetails(prevState => ({
            ...prevState,
            [id]: value // Use square brackets for dynamic property name
        }));
    }

    const addMenuItem = async() =>{
        try {
            console.log(foodDetails)
            const response = await fetch('http://localhost:8080/api/add_food_by_store', { // Update to your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodDetails),
        });
            if (response.ok) {
                //const data = await response.json();
                console.log('Food item added Successfully!');
                // setStoreMenu(data);
    
            } else {
                console.error('Failed to add food item');
                // setError('Login failed. Please try again.');
            }
        } catch (error) {
            // setError('An error occurred. Please try again.');
            console.error('An error occurred:', error);
        }
    }

    const saveFoodItem = () =>{
        const isConfirmed = window.confirm("Are you sure you want to save?");
        if (isConfirmed) {
            // Proceed with the save operation
            // For example, you can call a function to handle saving data
            addMenuItem();
        }else{
            return;
        }
    }


    return (
        <div>
        <Navbar />
        <div className="blank-container">
            <h1>Welcome to add menu item</h1>
            <p>This is a blank page example.</p>
        </div>
        <label htmlFor="foodName">Food Name:</label>
<input onChange={onChangeHandler} value={foodDetails.foodName} type="text" id="foodName" />

<label htmlFor="foodPrice">Food Price:</label>
<input onChange={onChangeHandler} value={foodDetails.foodPrice} type="number" id="foodPrice" />

<label htmlFor="foodType">Food Type:</label>
<input onChange={onChangeHandler} value={foodDetails.foodType} type="text" id="foodType" />
            <button onClick={saveFoodItem}>Save</button>
        </div>
    );
};

export default StoreMenuPage;
