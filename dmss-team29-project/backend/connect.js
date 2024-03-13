const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import the cors middleware

const app = express();

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

app.get('/menu', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("select * from MENU");
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
