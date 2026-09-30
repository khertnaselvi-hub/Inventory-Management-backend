import java.sql.*;

public class InventoryInitBridge {

    public static void main(String[] args) {

        String URL = "jdbc:sqlite:database/inventory.db";

        try {
            Connection con = DriverManager.getConnection(URL);

            Statement stmt = con.createStatement();

            stmt.executeUpdate(
                "CREATE TABLE IF NOT EXISTS products (" +
                "product_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "product_name TEXT, " +
                "category TEXT, " +
                "price REAL, " +
                "quantity INTEGER)"
            );

            con.close();

            System.out.println("Database initialized successfully.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}