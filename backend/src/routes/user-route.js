const express = require('express')
const router = express.Router()
const User = require('../models/user-model')
const generateToken = require('../middleware/generateToken')

// ROUTING OPERATIONS HERE
// REGISTER USER
router.post('/register', async(req, res) => {
    try {
        const {email, password, username} = req.body
        const user = new User({email, password, username})
        await user.save()
        res.status(200).send({ message: "User registered successfully", user: user})
    } catch (error) {
        console.log("Error registering user: ", error)
        res.status(500).send({ message: "Error registering user"})
    }
})

// USER LOGIN
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if (!user) { return res.status(404).send({ message: "User could not be found"}) }

        const password_match = await user.comparePassword(password)
        if (!password_match) { return res.status(401).send({ message: "Invalid password" }) }

        const token = await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true, // ONLY WORKS WHEN WE HAVE 'https://'
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        })

        res.status(200).send({message: "Login Successful", token, user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }})

    } catch (error) {
        console.log("Error logging user in: ", error)
        res.status(500).send({ message: "Error logging user in "})
    }
})

// LOG USER OUT
router.post('/logout', async(req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).send({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error logging user out: ", error)
        res.status(500).send({ message: "Error logging user out"})
    }
})

// GET ALL USERS
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({}, 'id email role username')
        res.status(200).send({ message: "Users retrieved successfully", users})
    } catch (error) {
        console.log("Error getting all users: ", error)
        res.status(500).send({ message: "Error getting all users"})
    }
})

// DELETE A USER
router.delete('/users/:id', async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) { return res.status(404).send({ message: "User could not be found"}) }
        res.status(200).send({ message: "User deleted successfully"})
    } catch (error) {
        console.log("Error deleting a user: ", error)
        res.status(500).send({ message: "Error deleting a user"})
    }
})

// UPDATE USER ROLES
router.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {role} = req.body
        const user = await User.findByIdAndUpdate(id, {role}, {new: true})
        if (!user) { return res.status(404).send({ message: "User could not be found"}) }
        res.status(200).send({message: "User role updated successfully", user})
    } catch (error) {
        console.log("Error updating user roles", error)
        res.status(500).send({ message: "Error updating user roles"})
    }
})

// UPDATE USER'S USERNAME, NEAR 1:1 CLONE OF THE PREVIOUS METHOD
router.put('/users/:id/username', async(req, res) => {
    try {
        const {id} = req.params
        const { username } = req.body
        const user = await User.findByIdAndUpdate(id, { username }, {new: true})
        if (!user) { return res.status(404).send({ message: "User could not be found"}) }
        res.status(200).send({message: "Username updated successfully", user})
    } catch (error) {
        console.log("Error updating Username", error)
        res.status(500).send({ message: "Error updating Username"})
    }
})

// SEARCH FOR USERS
router.get('/search', async(req, res) => {
    try {
        const { query } = req.query;
        if (query === undefined || query === '') {
            const users = await User.find(); 
            return res.status(200).send({ message: "Users retrieved successfully", users });
        }
        
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).send({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.log("Error searching for user:", error);
        res.status(500).send({ message: "Error searching for user" });
    }
});




module.exports = router