import Navbar from '../../Navbar';

import '../../shared/layout/OrderHistory.css'; // Import Food.css for styling

const OrderHistory = () => {

    return (
        <div>
            <Navbar /> {/* Include the same navbar */}
            <div class="container">
                <div class="search-container">
                    <select>
                    <option value="">Select Food Store</option>
                    <option value="store1">Store 1</option>
                    <option value="store2">Store 2</option>
                    </select>
                    Start Date
                    <input type="date" placeholder="Start Date" />
                    End Date
                    <input type="date" placeholder="End Date" />
                    <button>Search</button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Orders</th>
                        <th>Ordered Date</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Item 1</td>
                        <td>2023-12-14</td>
                        <td>2</td>
                        <td>$10.99</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Item 2</td>
                        <td>2023-12-15</td>
                        <td>1</td>
                        <td>$5.99</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
