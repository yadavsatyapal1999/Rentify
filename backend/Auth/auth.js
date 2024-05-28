const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log("Reached auth middleware");
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header
        const verify = jwt.verify(token, "satya@123"); // Verify the token
        req.userId = verify.id; // Store the user reference ID in the request object
        console.log("Authentication successful");
        next(); // Call next() to move on to the next middleware or route handler
    } catch (error) {
        console.error("Authentication failed:", error.message);
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
}

module.exports = auth;
