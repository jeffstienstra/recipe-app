const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
    next();
};