const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ message: 'Access Denied'});
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invailid Token"});
    }
};

