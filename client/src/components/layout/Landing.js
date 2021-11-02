import React from 'react';
import {Button, Container, CssBaseline, Typography} from "@mui/material";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) return <Redirect to={'/dashboard'} />

    return (
        <div className={'landing'}>
            <CssBaseline />
            <Container fixed>
                <Typography variant={'h2'}>
                    Developer Connector
                </Typography>
                <Typography variant={'overline'} className={'desc-landing'}>
                    Create a developer profile/portfolio, find partners, share <br/> posts and get help from other developers
                </Typography>
                <div>
                    <Link to={'/register'}>
                        <Button variant={"contained"}>Register</Button>
                    </Link>
                    <Link to={'login'}>
                        <Button variant={"contained"}>Login</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);