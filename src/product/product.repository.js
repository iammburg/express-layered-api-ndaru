// berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
};

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
};

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        },
    });

    return product;
};

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image,
        },
    });

    return product;
};

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id,
        },
    });
};

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image,
        },
    });

    return product;
};

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    findProductByName,
    deleteProduct,
    editProduct,
};
