import express from "express";
import auth from '../../middleware/auth.js'
import Profile from '../../models/Profile.js'
import Users from "../../models/User.js";
import {check, validationResult} from "express-validator";
import Posts from "../../models/Posts.js";
import axios from "axios";
import "config"

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['name', 'avatar']
        );
        if (!profile) {
            return res.status(400).json({ msg: 'There is no user for this profile' })
        }
        return res.json(profile)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post('/',
    [
        auth,
        [
            check('status', 'Status is required')
                .not()
                .isEmpty(),

            check('skills', 'Skills is required')
                .not()
                .isEmpty()
        ] ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }

        const {
            website,
            status,
            skills,
            bio,
            githubusername,
            // title,
            company,
            location,
            // description,
            instagram,
            telegram,
            youtube,
            facebook,
            whatsapp,
            linkedin,
            sololearn
        } = req.body

        const profileFields = {}
        profileFields.user = req.user.id

        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim())
        }

        profileFields.socials = {}

        if (youtube) profileFields.socials.youtube = youtube
        if (telegram) profileFields.socials.telegram = telegram
        if (facebook) profileFields.socials.facebook = facebook
        if (whatsapp) profileFields.socials.whatsapp = whatsapp
        if (linkedin) profileFields.socials.linkedin = linkedin
        if (instagram) profileFields.socials.instagram = instagram
        if (sololearn) profileFields.socials.sololearn = sololearn

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }

            profile = new Profile(profileFields)
            await profile.save()
            return res.json(profile)

        } catch (err) {
            return res.status(500).send(err.message)
        }
})

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        return res.json(profiles)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: "There is no user profile" })
        }
        return res.json(profile)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile Not Found :(' })
        }
        return res.status(500).send(err.message)
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await Posts.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
        await Users.findOneAndRemove({ _id: req.user.id })

        return res.json({ msg: 'User Deleted' })
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            title,
            company,
            location,
            description,
            from,
            to,
            current
        } = req.body

        const newExp = {
            title,
            company,
            location,
            description,
            from,
            to,
            current
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id})

            profile.experience.unshift(newExp)
            await profile.save()

            return res.json(profile)
        } catch (err) {
            return res.status(500).send(err.message)
        }
})

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id})

        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()

        return res.json(profile)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})


router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required')
                .not()
                .isEmpty(),
            check('degree', 'Degree is required')
                .not()
                .isEmpty(),
            check('fieldofstudy', 'Field of study date is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            school,
            degree,
            fieldofstudy,
            description,
            from,
            to,
            current
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            description,
            from,
            to,
            current
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id})

            console.log(profile)
            profile.education.unshift(newEdu)
            await profile.save()

            return res.json(profile)
        } catch (err) {
            return res.status(500).send(err.message)
        }
    })

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id})

        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()

        return res.json(profile)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${process.env.githubToken}`
        };

        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        return res.status(404).json({ msg: 'No Github profile found' });
    }
});

export default router