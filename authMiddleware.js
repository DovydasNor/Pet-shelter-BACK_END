const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).send({ error: 'No token provided' })
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Failed to authenticate token' })
        }
        req.user = decoded
        next()
    })
}

module.exports = authMiddleware