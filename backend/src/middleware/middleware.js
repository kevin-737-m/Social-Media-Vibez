const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        req.id = user.id;
        next();
    });
}

module.exports = middleware;