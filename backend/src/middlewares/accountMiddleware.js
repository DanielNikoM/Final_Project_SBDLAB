const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ success: false, message: 'No token provided' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid token' });

        console.log('Token verified, user:', user);
        req.user = user;
        next();
    });
}

// create generetaccesstoken for user with id and email
const generateAccessToken = (id, email) => {
    return jwt.sign({ id: id, email: email }, secretKey);
}


module.exports = authenticateToken;
