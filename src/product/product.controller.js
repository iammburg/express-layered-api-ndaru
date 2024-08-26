// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const router = express.Router();
const prisma = require("../db");
const authenticateToken = require("../middleware/auth.middleware");
const {
    getAllProduct,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
    const products = await getAllProduct();

    res.send(products);
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(parseInt(productId));
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", authenticateToken, async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData);

        res.status(201).send({
            data: product,
            message: "Create product success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.id; // string

        await deleteProductById(parseInt(productId));
        res.send("product deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (!(productData.name && productData.description && productData.price && productData.image)) {
        res.status(400).send("Some fields are missing");
        return;
    }

    const product = await editProductById(parseInt(productId), productData);
    res.send({
        data: product,
        message: "Edit product success",
    });
});

router.patch("/:id", authenticateToken, async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const product = await editProductById(parseInt(productId), productData);

        res.send({
            data: product,
            message: "Edit product success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
