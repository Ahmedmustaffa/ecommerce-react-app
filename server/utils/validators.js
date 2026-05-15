const Joi = require('joi');

// User Validation
const validateUser = (data) => {
    const schema = Joi.object({
        userName: Joi.string()
            .min(3)
            .max(20)
            .required(),
            
        password: Joi.string()
            .min(8)
            .max(25)
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    });
    return schema.validate(data);
};

// Product Validation 
const validateProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        desc: Joi.string().min(15).required(),
        price: Joi.number().positive().min(0.01).required(),
        image: Joi.string()
            .regex(/\.(jpg|jpeg|png|webp)$/i)
            .required(),
        category: Joi.string().required()
    });
    return schema.validate(data);
};

// Cart Validation
const validateCart = (data) => {
    const schema = Joi.object({
        productId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/) 
            .required()
            .messages({
                'string.pattern.base': 'Invalid Product ID format'
            }),
        quantity: Joi.number().integer().min(1).default(1)
    });
    return schema.validate(data);
};

module.exports = {
    validateUser,
    validateProduct,
    validateCart
};