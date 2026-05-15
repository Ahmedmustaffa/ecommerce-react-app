const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true , minLength : 2, maxLength : 30},
    desc: { type: String, required: true, minLength: 15 },
    price: { type: Number, required: true  , min: 0.01},
    image: { type: String, required: true, match: [/\.(jpg|jpeg|png|webp)$/i] },
    category: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);