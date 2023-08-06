const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const {bcrypt} = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Vipulisabeast';

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password should be of length 5").isLength({ min: 5 }),
    async (req, res) => {
        let success = false;
        // if there are errors, return the bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        // console.log(req.body);
        // const user = User(req.body);
        // user.save();

        try {
            // check whwether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ success, error: "sorry a user with this email already exists." });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            //   .then(user => res.json(user))
            //   .catch(err=>{console.log(err)
            //     res.json({error:"Please Enter a Unique value  for email", message: err.message})
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error Occured");
        }
    }
);

// Route 2:autenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwords cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: Get loggedin User Details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router