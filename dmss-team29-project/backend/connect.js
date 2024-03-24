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

// get store 1 breakfast
app.get("/Store1Breakfast", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '1' and Type = 'Breakfast'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get store 1 lunch and dinner
app.get("/Store1LunchAndDinner", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '1' and Type = 'Lunch and Dinner'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get store 1 drinks
app.get("/Store1Drinks", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '1' and Type = 'Drink'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get store 2 breakfast
app.get("/Store2Breakfast", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '2' and Type = 'Breakfast'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get store 2 lunch and dinner
app.get("/Store2LunchAndDinner", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '2' and Type = 'Lunch and Dinner'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get store 2 drinks
app.get("/Store2Drinks", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      "select * from MENU where StoreID = '2' and Type = 'Drink'"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query(
      `select * from EMPLOYEES where Username = '${userId}' and Pwd = '${password}'`
    );
    if (result.recordset.length > 0) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
