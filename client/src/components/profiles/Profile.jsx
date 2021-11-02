import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import {Link} from "react-router-dom";
import {BackdropLoader} from "../layout/Spinner";
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEdu from "./ProfileEdu";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ getProfileById, profile: { profile, loading}, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id)
        // eslint-disable-next-line
    }, [getProfileById])
    return (
        <>
            {profile === null || loading ? (<BackdropLoader />) : (
                <Container>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (
                        <>
                            <Link to={'/edit-profile'}>
                                <Button variant={'contained'}>Edit Profile</Button>
                            </Link>
                        </>
                    )}
                    <>
                        <ProfileTop  profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <Container sx={{ mt: 5 }}>
                            <Typography variant={'h5'}>Experience</Typography>
                            {profile.experience.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 990 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell onClick={() => console.log(profile.githubusername)}>company</TableCell>
                                                <TableCell>location</TableCell>
                                                <TableCell>from</TableCell>
                                                {profile.experience.to !== null ? <TableCell>to</TableCell> : <TableCell />}
                                                {profile.experience.current ? <TableCell>current</TableCell> : <TableCell />}
                                                <TableCell>title</TableCell>
                                                <TableCell>description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {profile.experience.map(experience => (
                                                <ProfileExperience
                                                    key={experience._id}
                                                    experience={experience} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : <Typography variant={'h5'}>No Experience</Typography> }
                        </Container>
                        <Container sx={{ mt: 5 }}>
                            <Typography variant={'h5'}>Education</Typography>
                            {profile.education.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 990 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Education</TableCell>
                                                <TableCell>Degree</TableCell>
                                                <TableCell>from</TableCell>
                                                <TableCell>to</TableCell>
                                                <TableCell>current</TableCell>
                                                <TableCell>description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {profile.education.map(education => <ProfileEdu education={education} />)}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : <Typography variant={'h5'}>No Education credentials</Typography> }
                        </Container>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername}/>
                        )}
                    </>
                </Container>
            )}
        </>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getProfileById }
)(Profile)