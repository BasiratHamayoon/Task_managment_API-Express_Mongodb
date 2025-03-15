const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: "Access Denied" });
        }

        // Handle "Bearer " prefix
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        console.log("Received Token:", token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified Token Data:", verified);

        req.user = verified;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};
