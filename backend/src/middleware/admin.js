const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({success: false, message: "No permission allowed to perform this action. Log in as an Admin"})
    }
    next()
}

module.exports = isAdmin