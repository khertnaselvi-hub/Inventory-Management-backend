import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class InventoryViewBridge {

    public static void main(String[] args) {

        String url = "jdbc:sqlite:database/Inventory.db";

        String sql = "SELECT product_id, product_name, category, price, quantity FROM products";

        try (
            Connection con = DriverManager.getConnection(url);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(sql)
        ) {

            while (rs.next()) {
                System.out.println(
                    rs.getInt("product_id") + "|" +
                    rs.getString("product_name") + "|" +
                    rs.getString("category") + "|" +
                    rs.getDouble("price") + "|" +
                    rs.getInt("quantity")
                );
            }

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}