import React, {Fragment, useEffect} from 'react';
import {Button, Container, createTheme, ThemeProvider, Typography} from "@mui/material";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import {BackdropLoader} from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experiences from "./Experiences";
import Education from "./Education";


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return loading && profile === null ? <BackdropLoader /> : (
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark'} })}>
            <Container sx={{ mt: 5 }}>
                <div>
                    {profile !== null ? (
                        <Container>
                            <Typography variant={'overline'} component={'h5'}>
                                {user && user.name}
                            </Typography>
                            <Fragment>
                                <Experiences experience={profile.experience}/>
                                <Education education={profile.education} />
                            </Fragment>
                            <DashboardActions />
                        </Container>
                    ) : (
                        <>
                            <Typography component={'span'} variant={'body1'}>
                                If i'm not mistaken you don't have profile yet.
                                <Link to='/create-profile'>
                                    <Button>Create</Button>
                                </Link> Your Profile.
                            </Typography>
                        </>
                    )}
                </div>
                <footer className={'ad'}>Hey developer. Website developed by <a href={'https://lazizbe.uz'}>Lazizbek</a>, pls text me</footer>
            </Container>
        </ThemeProvider>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);