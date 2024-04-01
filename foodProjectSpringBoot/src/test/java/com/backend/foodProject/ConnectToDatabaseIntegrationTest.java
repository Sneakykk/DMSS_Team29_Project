package com.backend.foodProject;

import com.backend.foodProject.database.ConnectToDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

class ConnectToDatabaseIntegrationTest {

    @Test
    void testIntegrationWithH2() {
        // Setup DataSource for H2
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://team29database.cvsgu0ki6trg.ap-southeast-1.rds.amazonaws.com:1433;databaseName=project;encrypt=false;trustServerCertificate=false");
        dataSource.setUsername("admin");
        dataSource.setPassword("password123");

        // Now you can use this dataSource to create an instance of your ConnectToDatabase
        ConnectToDatabase connectToDatabase = new ConnectToDatabase(dataSource);

        // Proceed with your test, maybe setting up the database schema and inserting test data before testing methods
    }
}
