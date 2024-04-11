import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../shared/layout/StoreMenuItem.css';

const StoreMenuPage = () => {

    const [userData, setUserData] = useState([null]);
    const [storeMenu, setStoreMenu] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
  
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});
        }
    },[])

    useEffect(()=>{
        if(userData.storeId){
            loadMenuItemsByStore(userData.storeId);
        }
        
    },[userData])


    const loadMenuItemsByStore = async(storeId) =>{
        try {
            console.log(storeId)
            const response = await fetch('http://localhost:8080/api/get_food_menu_by_store', { // Update to your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: storeId,
        });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetch Menu by Store Successfully!',data);
                setStoreMenu(data);
    
            } else {
                console.error('Failed to get Menu by Store');
                // setError('Login failed. Please try again.');
            }
        } catch (error) {
            // setError('An error occurred. Please try again.');
            console.error('An error occurred:', error);
        }
    }

    const addNewMenu = () =>{
        navigate('/addStoreItem?action=add');
    }

    const editItem = e =>{
        const {id} = e.target;
        navigate(`/addStoreItem?itemId=${id}&action=edit`);
    }

    return (
        <div>
        <Navbar />
        <div className="edit-container">
            <h1>Store Menu Configuration Page</h1>
        </div>
        <button className="add-button" onClick={addNewMenu}>Add New Item</button>
        <table>
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Food Name</th>
                        <th>Price($)</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {storeMenu.map((row,index) =>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.itemName}</td>
                            <td>${row.itemPrice}</td>
                            <td>{row.itemType}</td>
                            <td><button className="edit-button" onClick={editItem} id={row.itemId}>Edit</button></td>
                        </tr>
                    ))}
                    </tbody>
        </table>
        </div>
    );
};

export default StoreMenuPage;
