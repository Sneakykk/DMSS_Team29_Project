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
    }, []);


    return (
        <Layout>
            <div>
                <h2>Dashboard</h2>
                <p>Welcome to your dashboard!</p>
                <p>User Information:</p>
                    <p>Name: {userData?.username}</p>
                    <p>Email: {userData?.employeeId}</p>
            </div>
        </Layout>
    );
};

export default Dashboard;
