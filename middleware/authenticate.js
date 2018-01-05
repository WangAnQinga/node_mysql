const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('X-Access-Token');

    if (token) {
        jwt.verify(token, 'I_LOVE_LL', (error, decoded) => {
            if (error) {
                return res.send(error)
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        return res.status(403).send({ message: '没有权限' })
    }
}

module.exports = authenticate