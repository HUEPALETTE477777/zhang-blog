const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY
const User = require('../models/user-model')

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) { throw new Error("User not found") }
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
        return token;
    } catch (error) {
        console.log("Error generating token: ", error);
        throw error;
    }
}

module.exports = generateToken;