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

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "error in fetching product", error });
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

exports.updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: "error in updating product", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "error in deleting product", error });
    }
};
