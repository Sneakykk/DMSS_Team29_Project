package com.backend.foodProject.database;

import org.springframework.stereotype.Service;

import java.sql.*;
import javax.sql.DataSource;

@Service
public class ConnectToDatabase {

    private DataSource dataSource;

    public ConnectToDatabase(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void connect() {
        String sql = "SELECT * FROM MENU";
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery(sql)) {

            while (result.next()) {
                String storeID = result.getString("StoreID");
                String itemName = result.getString("ItemName");
                String price = result.getString("ItemPrice");

                System.out.println("Store ID: " + storeID + "  Item name: " + itemName + "   Price: $" + price);
            }
        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
        }
    }

    public boolean getLoginInfo(String username, String password) {
        // Correct SQL query using placeholders for parameters
        String sql = "SELECT Pwd FROM EMPLOYEES WHERE Username = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Set the placeholder value with the provided username
            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    String passwordTaken = resultSet.getString("Pwd");
                    return password.equals(passwordTaken);
                }
            }
        } catch (SQLException e) {
            System.err.println("Failed to retrieve login information: " + e.getMessage());
        }
        return false;
    }

}
