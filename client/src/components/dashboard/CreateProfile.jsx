import React, {useState} from 'react';
import { createProfile } from '../../actions/profile';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    Box,
    Button,
    Container,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {
    AiFillChrome,
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillYoutube, FaDev, FaTelegramPlane, FaWhatsappSquare, FcApproval
} from "react-icons/all";

const CreateProfile = ({ createProfile, history }) => {
    const [socials, setSocials] = useState(false)

    const [formData, setFormData] = useState({
        website: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        company: '',
        location: '',
        instagram: '',
        telegram: '',
        youtube: '',
        facebook: '',
        whatsapp: '',
        linkedin: '',
        sololearn: ''
    })

    const {
        website,
        status,
        skills,
        bio,
        githubusername,
        company,
        location,
        instagram,
        telegram,
        youtube,
        facebook,
        whatsapp,
        linkedin,
        sololearn
    } = formData

    const socialsHandler = () => setSocials(socials === false ? true : !socials)

    const changeValue = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createProfile(formData, history)
    }

    return (
        <Container>
            <Typography variant={'overline'} component={'h4'} style={{display: 'flex', alignItems: 'center', marginTop: '2rem', color: '#6b6b6b'}}>
                <FcApproval size={'1.50rem'} /> create a professional profile for others to know about you
            </Typography>

            <form onSubmit={e => onSubmit(e)}>
                <InputLabel id="demo-simple-select-label">Select Professional status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={status}
                    name={'status'}
                    style={{ display: 'flex', alignItems: 'center' }}
                    onChange={(e) => changeValue(e)}
                >
                    <MenuItem value={'Junior'}>Junior<FaDev size={'1.5rem'} /></MenuItem>
                    <MenuItem value={'Middle'}>Middle<FaDev size={'1.5rem'} /></MenuItem>
                    <MenuItem value={'Senior'}>Senior<FaDev size={'1.5rem'} /></MenuItem>
                </Select>
                {/*<select>
                    <option value={'web-developer'}>Web Developer</option>
                    <option value={'ios-developer'}>iOS Developer</option>
                </select>*/}

                <TextField
                    label="Company name"
                    variant="standard"
                    name={'company'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={company}
                />

                <TextField
                    label="Website"
                    type={'url'}
                    name={'website'}
                    onChange={(e) => changeValue(e)}
                    variant="standard"
                    sx={{mt: 3}}
                    value={website}
                />
                <FormHelperText>Enter your portfolio website url</FormHelperText>

                <TextField
                    label="Address"
                    variant="standard"
                    name={'location'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={location}
                />
                <FormHelperText>Enter your location</FormHelperText>

                <TextField
                    label="Skills"
                    variant="standard"
                    name={'skills'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={skills}
                    placeholder='ex: js, py, C#'
                />
                <FormHelperText>Enter the programming languages and technologies you know. Separate with a comma</FormHelperText>

                <TextField
                    label="Github username"
                    name={'githubusername'}
                    onChange={(e) => changeValue(e)}
                    variant="standard" sx={{mt: 3}}
                    value={githubusername}
                    placeholder='ex: LazizbekDev'
                />
                <FormHelperText>Only user name. Not url</FormHelperText>

                <TextField
                    label="Bio"
                    variant="standard"
                    name={'bio'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={bio}
                />
                <FormHelperText>A short bio of your self</FormHelperText>

                <Container sx={{mt: 5}}>
                    <Typography variant={'caption'} component={'sub'}>
                        <Button onClick={socialsHandler} variant={socials ? 'contained' : 'outlined'}>
                            {socials ? 'Open socials tab' : 'Close socials tab'}
                        </Button> (optional)
                    </Typography>
                    <Grid container spacing={2} style={{display: socials && 'none'}}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <AiFillYoutube size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="YouTube"
                                    variant="filled"
                                    name={"youtube"}
                                    onChange={(e) => changeValue(e)}
                                    type={'url'}
                                    value={youtube}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <FaTelegramPlane size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="Telegram"
                                    name={'telegram'}
                                    onChange={(e) => changeValue(e)}
                                    variant="filled"
                                    type={'url'}
                                    value={telegram}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{display: socials && 'none'}}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <AiFillLinkedin size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="LinkedIn"
                                    name={"linkedin"}
                                    onChange={(e) => changeValue(e)}
                                    variant="filled"
                                    type={'url'}
                                    value={linkedin}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <AiFillFacebook size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="Facebook"
                                    name={"facebook"}
                                    onChange={(e) => changeValue(e)}
                                    variant="filled"
                                    type={'url'}
                                    value={facebook}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{display: socials && 'none'}}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <FaWhatsappSquare size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="Whatsapp"
                                    name={"whatsapp"}
                                    onChange={(e) => changeValue(e)}
                                    variant="filled"
                                    type={'url'}
                                    value={whatsapp}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{mt: 3}}>
                                <AiFillInstagram size={'3.5rem'} style={{marginRight: 15}}/>
                                <TextField
                                    fullWidth={true}
                                    label="Instagram"
                                    name={'instagram'}
                                    onChange={(e) => changeValue(e)}
                                    variant="filled"
                                    type={'url'}
                                    value={instagram}
                                />
                            </Box>
                        </Grid>
                    </Grid>


                    <Box style={{ display: !socials ? 'flex' : 'none', alignItems: 'center' }} sx={{mt: 3}}>
                        <AiFillChrome size={'3.5rem'} style={{marginRight: 15}}/>
                        <TextField
                            fullWidth={true}
                            label="SoloLearn"
                            name={'sololearn'}
                            onChange={(e) => changeValue(e)}
                            variant="filled"
                            type={'url'}
                            value={sololearn}
                        />
                    </Box>
                    <Button sx={{mt: 4}} variant={'contained'} fullWidth={true} type={'submit'}>Save</Button>
                </Container>
            </form>
        </Container>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(
    null,
    {createProfile}
)(withRouter(CreateProfile))