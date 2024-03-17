package com.projectgogetfood;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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

    public boolean getLoginInfo(String userInfo, String password)
    {
        try {
            Connection connection = DriverManager.getConnection(url, user, pwd);
            System.out.println("Connected to database");
            String sql = "SELECT * FROM USER where username = ?";
            Statement statement = connection.createStatement();
            preparedStatement.setString(1, userInfo);
            ResultSet result = statement.executeQuery(sql);

            while (result.next()) {
                String passwordTaken = resultSet.getString("password");
                if (password.equals(passwordTaken)) {
                    return true;
                }
            }

            return false;
        }
        catch (Exception e)
        {
            System.out.println("Oops, there's an error: " + e.toString());
        }
    }
}
