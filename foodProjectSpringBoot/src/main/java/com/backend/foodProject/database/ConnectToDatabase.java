package com.backend.foodProject.database;

import java.sql.*;

public class ConnectToDatabase {

    private String url;
    private String user;
    private String pwd;

    public ConnectToDatabase(){
        url = "jdbc:sqlserver://team29database.cvsgu0ki6trg.ap-southeast-1.rds.amazonaws.com:1433;databaseName=project;encrypt=true;trustServerCertificate=true";
        user = "admin";
        pwd = "password123";
    }

    public void connect(){
        try {

            Connection connection = DriverManager.getConnection(url, user, pwd);
            System.out.println("Connected to database");
            String sql = "SELECT * FROM MENU";
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery(sql);

            while(result.next()){
                String storeID = result.getString("StoreID");
                String itemName = result.getString("ItemName");
                String price = result.getString("ItemPrice");

                System.out.println("Store ID: "+storeID+"  Item name: "+itemName+"   Price: $"+price);

            }
            connection.close();
        } catch (SQLException e) {
            System.out.println("Oops, there's an error: " + e.toString());
        }
    }

    public boolean getLoginInfo(String userInfo, String password) {
        // SQL query to retrieve user information by username
        String sql = "SELECT * FROM USER WHERE username = ?";

        try (Connection connection = DriverManager.getConnection(url, user, pwd);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Set the username parameter in the prepared statement
            preparedStatement.setString(1, userInfo);

            // Execute the query
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                // Iterate through the results
                while (resultSet.next()) {
                    // Retrieve the password from the result set
                    String passwordTaken = resultSet.getString("password");

                    // Check if the provided password matches the retrieved password
                    if (password.equals(passwordTaken)) {
                        return true; // Authentication successful
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Oops, there's an SQL error: " + e.getMessage());
        }

        return false; // Authentication failed
    }
}
