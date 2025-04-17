const jwt = require('jsonwebtoken');
require("dotenv").config()
const privateKey = process.env.JWT_TOKEN;

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.')
    
    try {
        const decoded = jwt.verify(token, "iYGa2wylF2X7ohVUeI37Hm26JKjtHa2n");
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid token.");
    }
}

module.exports = auth;