const sql = require("mssql");
var config = {
  server: "team29database.cvsgu0ki6trg.ap-southeast-1.rds.amazonaws.com",
  // driver: "msnodesqlv8",
  database: "project",
  user: "admin",
  password: "password123",
  options: {
    trustedConnection: true,
    encrypt: false,
  },
};

sql.connect(config, function (err) {
  if (err) {
    console.log(`Error in connecting. ErrorMsg: ${err}`);
    throw err;
  }
  console.log("Connection successful!");
  var request = new sql.Request();
  request.query("select * from MENU", function (err, records) {
    if (err) {
      console.log(err);
    } else {
      const item20Data = records.recordset.find((item) => item.ItemID === 20);
      const itemID = item20Data.ItemID;
      const storeID = item20Data.StoreID;
      const itemName = item20Data.ItemName;
      const itemPrice = item20Data.ItemPrice;
      console.log(
        `Store number ${storeID} is selling item number ${itemID} - ${itemName} at a discounted price from its original $${itemPrice}`
      );
    }
  });
});
