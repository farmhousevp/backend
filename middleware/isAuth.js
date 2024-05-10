const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const {
        token
    } = req.body;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "somesupersecretsecret");
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token!' });
    }
    if (!decodedToken) {
        return res.status(401).json({ error: 'Token has expired' });
    }
    req.userId = decodedToken.userId;
    next();
};