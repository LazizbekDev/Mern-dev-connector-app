import express from "express";
import auth from '../../middleware/auth.js';
import {check, validationResult} from "express-validator";
import Users from "../../models/User.js";
import jwt from 'jsonwebtoken'
import config from "config";

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        return res.json(user)
    } catch (err) {
        return res.status(500).send('Server error')
    }
})


router.post('/', [
    check('email', 'Invalid email address!')
        .isEmail(),

    check(
        'password',
        'Password required'
    )
        .exists()
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body
    try {
        let user = await Users.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .send({
                    errors: [
                        { msg: "Invalid Credentials" }
                    ]
                })
        }

        const isMatch = await password === user.password

        if (!isMatch) {
            return res
                .status(400)
                .send({
                    errors: [
                        { msg: "Invalid Password" }
                    ]
                })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw new Error(err)
                return res.json({ token })
            }
        )
    } catch (err) {
        return res.status(500).send(err.message)
    }
})


export default router