import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class InventoryBridge {

    public static void main(String[] args) {

        if (args.length != 4) {
            System.out.println("ERROR: Please provide product, category, price, quantity");
            return;
        }

        String product = args[0];
        String category = args[1];
        double price = Double.parseDouble(args[2]);
        int quantity = Integer.parseInt(args[3]);

        String url = "jdbc:sqlite:database/Inventory.db";

        String sql = "INSERT INTO products (product_name, category, price, quantity) VALUES (?, ?, ?, ?)";

        try (
            Connection con = DriverManager.getConnection(url);
            PreparedStatement pstmt = con.prepareStatement(sql)
        ) {
            pstmt.setString(1, product);
            pstmt.setString(2, category);
            pstmt.setDouble(3, price);
            pstmt.setInt(4, quantity);

            pstmt.executeUpdate();

            System.out.println("SUCCESS: Product added");

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}