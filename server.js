const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");

const javaProjectPath =  __dirname;

const app = express();

app.use(express.json());
app.use(cors());


// ADD PRODUCT
app.post("/add-product", (req, res) => {

    const { product, category, price, quantity } = req.body;

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryBridge",
            product,
            category,
            price.toString(),
            quantity.toString()
        ],
        {
            cwd: javaProjectPath
        }
    );

    java.stdout.on("data", (data) => {
        console.log(data.toString());
        res.send(data.toString());
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
        res.status(500).send(data.toString());
    });

});


// VIEW PRODUCTS
app.get("/products", (req, res) => {

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryViewBridge"
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {

        const products = output
            .trim()
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => {

                const [id, product, category, price, quantity] =
                    line.split("|");

                return {
                    id,
                    product,
                    category,
                    price,
                    quantity
                };

            });

        res.json(products);
    });

});


// UPDATE PRODUCT
app.put("/update-product", (req, res) => {

    const { id, product, category, price, quantity } = req.body;

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryUpdateBridge",
            id.toString(),
            product,
            category,
            price.toString(),
            quantity.toString()
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {
        res.send(output);
    });

});


// DELETE PRODUCT
app.delete("/delete-product", (req, res) => {

    const { id } = req.body;

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryDeleteBridge",
            id.toString()
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {
        res.send(output);
    });

});
// UPDATE STOCK
app.put("/update-stock", (req, res) => {

    const { id, quantity } = req.body;

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryStockBridge",
            id.toString(),
            quantity.toString()
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {
        res.send(output);
    });

});
// LOW STOCK
app.get("/low-stock", (req, res) => {

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryLowStockBridge"
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {

        const products = output
            .trim()
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => {

                const [id, product, category, price, quantity] =
                    line.split("|");

                return {
                    id,
                    product,
                    category,
                    price,
                    quantity
                };

            });

        res.json(products);
    });

});
// DASHBOARD TOTALS
app.get("/dashboard", (req, res) => {

    const java = spawn(
        "java",
        [
            "-cp",
            `${javaProjectPath}:${path.join(javaProjectPath, "sqlite-jdbc-3.53.4.0.jar")}`,
            "InventoryDashboardBridge"
        ],
        {
            cwd: javaProjectPath
        }
    );

    let output = "";

    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    java.on("close", () => {

        const [totalProducts, totalStock, lowStock] =
            output.trim().split("|");

        res.json({
            totalProducts,
            totalStock,
            lowStock
        });
    });

});
const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});