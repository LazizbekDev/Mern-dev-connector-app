import express from "express";
import {check, validationResult} from "express-validator";
import Users from "../../models/User.js";
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'
import config from "config";

const router = express.Router();

router.post('/', [
    check('name', 'Name is Required')
        .not()
        .isEmpty(),

    check('email', 'Invalid email address!')
        .isEmail(),

    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, password } = req.body
    try {
        let user = await Users.findOne({ email })
        if (user) {
            res.status(400).send({ errors: [{ msg: "This email already exist" }] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = await new Users({
            name,
            email,
            avatar,
            password
        })

        // const salt = await bcrypt.getSalt(10)
        // user.password = await bcrypt.hash(password, salt)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw new Error(err)
                res.json({ token })
            }
        )
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
})

export default router