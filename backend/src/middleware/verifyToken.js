const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        // const token = req.headers.authorization?.split(' ')[1] // BEARER TOKEN
        if (!token) { return res.status(404).send({message: "No token found"}) }

        const decode = jwt.verify(token, JWT_SECRET)
        if (!decode.userId) { return res.status(404).send({message: "User ID could not be found"}) }

        req.userId = decode.userId
        req.role =decode.role
        next()
    } catch (error) {
        console.log("Error verifying user token", error)
        res.status(500).send({message: "Error verifying user token"})
    }
}

module.exports = verifyToken

