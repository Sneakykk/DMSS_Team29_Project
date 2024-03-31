const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors"); // Import the cors middleware

const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

var config = {
  server: "team29database.cvsgu0ki6trg.ap-southeast-1.rds.amazonaws.com",
  database: "project",
  user: "admin",
  password: "password123",
  options: {
    trustedConnection: true,
    encrypt: false,
  },
};

// Use cors middleware to enable CORS
app.use(cors());

app.get("/menu", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("select * from MENU");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get breakfast
app.get("/Breakfast", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select m.ItemID, m.StoreID, m.ItemName, m.ItemPrice, s.Name from MENU m left join STORE s on m.storeId = s.storeId where type = 'breakfast'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching breakfast menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get lunch and dinner
app.get("/LunchAndDinner", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select m.ItemID, m.StoreID, m.ItemName, m.ItemPrice, s.Name from MENU m left join STORE s on m.storeId = s.storeId where type = 'Lunch and Dinner'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching lunch and dinner menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get drinks
app.get("/Drinks", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select m.ItemID, m.StoreID, m.ItemName, m.ItemPrice, s.Name from MENU m left join STORE s on m.storeId = s.storeId where type = 'Drink'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching drinks menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to format date and time
function formatDateTime(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add leading zeros if needed
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  // Format: 'YYYY-MM-DD HH:mm:ss'
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query(
      `select * from EMPLOYEES where Username = '${userId}' and Pwd = '${password}'`
    );
    if (result.recordset.length > 0) {
      const employeeId = result.recordset[0].EmployeeID;
      const currentTime = formatDateTime(new Date());

      // record down access in Login table
      await sql.query(
        `insert into Login (EmployeeID, TimeOfLogin) values (${employeeId}, '${currentTime}')`
      );

      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/submit-order', async (req, res) => {
  const { userName, items, totalPrice } = req.body;

  let pool;
  pool = await sql.connect(config);
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();

    const request = new sql.Request(transaction);

    // Get the current maximum OrderID and increment by 1
    const result = await request.query('SELECT MAX(OrderID) as maxOrderId FROM Orders');
    const orderID = (result.recordset[0].maxOrderId || 0) + 1;
    for (const item of items) {
      console.log(item);
    }

    const itemNames = items.map(item => item.itemName).join(', '); 
    const itemQuantities = items.map(item => item.itemCount).join(', ');

    await request
      .input('orderID', sql.Int, orderID)
      .input('employeeID', sql.VarChar(sql.MAX), userName)
      .input('itemNames', sql.VarChar(sql.MAX), `[${itemNames}]`)
      .input('totalPrice', sql.Decimal(18, 2), totalPrice)
      .input('itemQuantities', sql.VarChar(sql.MAX), `[${itemQuantities}]`)
      .query(`
        INSERT INTO ORDERS (OrderID, EmployeeID, ItemName, TimeOfOrder, TotalBill, Quantity)
        VALUES (@orderID, @employeeID, @itemNames, GETDATE(), @totalPrice, @itemQuantities)
      `);

    // Create a new Request instance for each item to avoid parameter name conflicts
    for (const item of items) {
      let itemRequest = new sql.Request(transaction);
      await itemRequest
        .input('orderID', sql.Int, orderID)
        .input('itemID', sql.Int, item.itemID)
        .input('itemCount', sql.Int, item.itemCount)
        .query(`
          INSERT INTO ORDERED_QUANTITY (OrderID, ItemID, ItemCount)
          VALUES (@orderID, @itemID, @itemCount)
        `);
    }

    await transaction.commit();
    res.json({ success: true, message: 'Order submitted successfully', orderID });
  } catch (error) {
    await transaction.rollback(); // Roll back if there's an error
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the connection back to the pool
    pool.close();
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
