const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../utils/validators');
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d' });
};

exports.signup = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email
        });


        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: { user: newUser }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "Please enter your username and password" });
        }

        const user = await User.findOne({ userName }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

exports.protect = async (req, res, next) => {
    try {
        let token;

        // check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "You are not logged in! Please log in to get access." });
        }

        // check if token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //search for user with token
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: "The user belonging to this token no longer exists." });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token or expired session", error: err });
    }
};
