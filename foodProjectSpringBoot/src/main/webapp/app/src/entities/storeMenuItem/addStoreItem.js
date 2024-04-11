import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../shared/layout/AddStoreItem.css';

const StoreMenuPage = () => {
    const [userData, setUserData] = useState([null]);
    const [foodDetails, setFoodDetails] = useState({
        "foodId": null,
        "foodName": "",
        "foodPrice": "",
        "foodType": "",
        "storeId": ""
    });
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageToShow, setImageToShow] = useState(null);
    const [action, setAction] = useState('');
    const [title, setTitle] = useState('');
    const searchParams = new URLSearchParams(location.search);
    const itemId = new URLSearchParams(location.search).get('itemId');

    useEffect(() => {
        if (action === 'add') {
            setTitle('Add Food Item');
        } else if (action === 'edit') {
            setTitle('Edit Food Item');
        } else {
            setTitle('Error Item Page');
        }
    }, [action]);

    useEffect(() => {
        const actionParam = searchParams.get('action');
        if (actionParam === 'add' || actionParam === 'edit') {
            setAction(actionParam);
        } else {
            setAction('add');
        }
    }, [searchParams]);

    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});
        }
    }, []);

    useEffect(() => {
        if (userData && userData.storeId) {
            setFoodDetails(prevFoodDetails => ({
                ...prevFoodDetails,
                storeId: userData.storeId
            }));

            if (itemId !== null) {
                getMenuItem();
            }
        }
    }, [userData, itemId]); // Added itemId as a dependency

    const onChangeHandler = e => {
        const { value, id } = e.target;
        setFoodDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToShow(reader.result)
                setSelectedImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const getMenuItem = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/get_food_by_itemId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: itemId,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                console.log('Food item fetched Successfully!');
                setFoodDetails({
                    "foodId": data.itemId,
                    "foodName": data.itemName,
                    "foodPrice": data.itemPrice,
                    "foodType": data.itemType,
                    "storeId": userData.storeId
                });
            } else {
                console.error('Failed to fetch food item');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const addMenuItem = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/add_food_by_store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodDetails),
            });
            if (response.ok) {
                console.log('Food item added Successfully!');
                handleUpload();
            } else {
                console.error('Failed to add food item');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const updateMenuItem = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/update_food_by_itemId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodDetails),
            });
            if (response.ok) {
                console.log('Food item updated Successfully!');
            } else {
                console.error('Failed to update food item');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('fileName', foodDetails.foodName);
        console.log(formData);

        try {
            await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData,
            });
            // Handle response as needed
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const saveFoodItem = () => {
        if (selectedImage) {
            if (window.confirm(itemId ? "Are you sure you want to update?" : "Are you sure you want to save?")) {
                itemId ? updateMenuItem() : addMenuItem();
            } else {
                return;
            }
        } else {
            console.log("Please upload a jpg image");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <h1>{title}</h1>

                <label className="form-label" htmlFor="foodName">Food Name:</label>
                <input className="form-input" onChange={onChangeHandler} value={foodDetails.foodName} type="text" id="foodName" />

                <label className="form-label" htmlFor="foodPrice">Food Price:</label>
                <input className="form-input" onChange={onChangeHandler} value={foodDetails.foodPrice} type="number" id="foodPrice" />

                <label className="form-label" htmlFor="foodType">Food Type:</label>
                <input className="form-input" onChange={onChangeHandler} value={foodDetails.foodType} type="text" id="foodType" />

                <button className="form-button" onClick={saveFoodItem}>{itemId ? "Update" : "Save"}</button>

                <input type="file" onChange={handleImageChange} accept="image/*" />
                {selectedImage && (
                    <div>
                        <img src={imageToShow} alt="Selected" style={{ maxWidth: '200px' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreMenuPage;
