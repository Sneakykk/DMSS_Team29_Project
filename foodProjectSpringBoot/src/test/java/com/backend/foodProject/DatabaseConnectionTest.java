import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;
import java.sql.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Test
    public void testDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("DONEEEEEEEEEEEEEEEEE");
            assertNotNull(connection);
        } catch (SQLException e) {
            System.out.println("FAILURE");
            e.printStackTrace();
        }

        try (Connection connection = dataSource.getConnection()) {
        DatabaseMetaData metaData = connection.getMetaData();
        ResultSet resultSet = metaData.getColumns(null, null, "Orders", null);

        while (resultSet.next()) {
            String columnName = resultSet.getString("COLUMN_NAME");
            String dataType = resultSet.getString("TYPE_NAME");
            int columnSize = resultSet.getInt("COLUMN_SIZE");

            System.out.println("Column Name: " + columnName + ", Data Type: " + dataType + ", Size: " + columnSize);
        }
    } catch (SQLException e) {
        System.out.println("FAILURE");
        e.printStackTrace();
    }
    }

    @Configuration
    static class TestDataSourceConfiguration {

        @Bean
        @Primary
        public DataSource dataSource() {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            dataSource.setUrl("jdbc:sqlserver://team29database.cvsgu0ki6trg.ap-southeast-1.rds.amazonaws.com:1433;databaseName=project;encrypt=false;trustServerCertificate=false");
            dataSource.setUsername("admin");
            dataSource.setPassword("password123");
            return dataSource;
        }
    }
}
