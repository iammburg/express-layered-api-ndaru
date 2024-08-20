// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya reusable

const prisma = require("../db");
const {
    findProducts,
    findProductById,
    insertProduct,
    findProductByName,
    deleteProduct,
    editProduct,
} = require("./product.repository");

const getAllProduct = async () => {
    const products = await findProducts();

    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw Error("Product not found");
    }

    return product;
};

const createProduct = async (newProductData) => {
    const findProduct = await findProductByName(
        newProductData.name
    );

    if (findProduct) {
        throw new Error("Name has to be unique");
    }

    // if (
    //     !(
    //         !newProductData.name ||
    //         !newProductData.description ||
    //         !newProductData.price ||
    //         !newProductData.image
    //     )
    // ) {
    //     throw Error(
    //         "All fields (name, description, price, image) are required"
    //     );
    // }

    const product = await insertProduct(newProductData);
    return product;
};

const deleteProductById = async (id) => {
    await getProductById(id);

    await deleteProduct(id);
};

const editProductById = async (id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData);

    return product;
};

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
};
