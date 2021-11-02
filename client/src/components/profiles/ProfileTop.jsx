import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Fab, Paper, Stack, TableContainer, Typography} from "@mui/material";
import {
    AiFillChrome,
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillYoutube,
    AiOutlineWhatsApp,
    RiTelegramFill
} from "react-icons/all";

const ProfileTop = ({ profile: {
    status,
    website,
    location,
    company,
    socials,
    user: { name, avatar }
}}) => {
    return (
        <>
            <Paper
                elevation={4}
                sx={{ m: 3, p: 3 }}
                style={{display: 'grid', placeItems: 'center'}}
            >
                <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ maxWidth: 300, maxHeight: 300, minWidth: 100, minHeight: 100 }}
                />
                <Typography variant={'h4'} sx={{mt:4}}>{name}</Typography>
                <Typography variant={'h5'}>{status} {company && <span>Developer at {company}</span>}</Typography>
                <Typography variant={'body2'}>{location && <span>{location}</span>}</Typography>
                <Typography variant={'caption'}>{website && <a href={website} rel={'noreferrer'} target={'_blank'}>{website}</a>}</Typography>

                <TableContainer sx={{ maxHeight: 240, mt: 2, mb: 4, width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                    {!socials ? <Typography color={'tomato'} variant={'overline'}>Socials Not Found</Typography> :
                        (
                            <Stack direction="row" spacing={2} sx={{mt:4}}>
                                {socials.youtube && (
                                    <a target={'_blank'} href={socials.youtube} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiFillYoutube size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.instagram && (
                                    <a target={'_blank'} href={socials.instagram} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiFillInstagram size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.telegram && (
                                    <a target={'_blank'} href={socials.telegram} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <RiTelegramFill size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.facebook && (
                                    <a target={'_blank'} href={socials.facebook} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiFillFacebook size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.whatsapp && (
                                    <a target={'_blank'} href={socials.whatsapp} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiOutlineWhatsApp size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.linkedin && (
                                    <a target={'_blank'} href={socials.linkedin} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiFillLinkedin size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                                {socials.sololearn && (
                                    <a target={'_blank'} href={socials.sololearn} rel={'noreferrer'}>
                                        <Fab aria-label="add">
                                            <AiFillChrome size={'2rem'} />
                                        </Fab>
                                    </a>
                                )}
                            </Stack>
                        )
                    }
                </TableContainer>
            </Paper>
        </>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;