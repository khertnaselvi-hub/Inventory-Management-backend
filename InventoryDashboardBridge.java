import java.sql.*;

public class InventoryDashboardBridge {

    public static void main(String[] args) {

        String URL = "jdbc:sqlite:database/inventory.db";

        try {
            Connection con = DriverManager.getConnection(URL);

            Statement stmt = con.createStatement();

            ResultSet rs1 = stmt.executeQuery(
                "SELECT COUNT(*) FROM products"
            );
            rs1.next();
            int totalProducts = rs1.getInt(1);

            ResultSet rs2 = stmt.executeQuery(
                "SELECT COALESCE(SUM(quantity), 0) FROM products"
            );
            rs2.next();
            int totalStock = rs2.getInt(1);

            ResultSet rs3 = stmt.executeQuery(
                "SELECT COUNT(*) FROM products WHERE quantity < 10"
            );
            rs3.next();
            int lowStock = rs3.getInt(1);

            System.out.println(
                totalProducts + "|" + totalStock + "|" + lowStock
            );

            con.close();

        } catch (Exception e) {
            System.out.println("0|0|0");
        }
    }
}
