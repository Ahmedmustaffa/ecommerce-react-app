const Product = require('../models/Product');
const { validateProduct } = require('../utils/validators');

exports.getAllProducts = async (req, res) => {
    
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "error in fetching products", error });
    }
};

exports.createProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: "error in creating product", error });
    }
};