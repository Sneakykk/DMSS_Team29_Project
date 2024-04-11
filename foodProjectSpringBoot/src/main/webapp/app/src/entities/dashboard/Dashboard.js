import React, {useEffect,useState} from 'react';
import Layout from '../../Layout';

const Dashboard = () => {
    // Access the state passed from the login page
    const [userData, setUserData] = useState([null]);

    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        console.log(storedUserData)
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});
            console.log(userData)
        }
    }, [userData]);


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
                    
                    </tbody>
                </table>
                </>
            )
        :
        (
            <p>user</p>
        )}
        </Layout>
    );
};

export default Dashboard;
