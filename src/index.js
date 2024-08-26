const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome!");
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    res.json({ accessToken });
});

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});
