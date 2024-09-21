const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        token = token.split(' ')[1]; // Remove 'Bearer ' from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Pass the entire decoded payload
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
