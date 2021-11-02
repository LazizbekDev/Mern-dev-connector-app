import React, {useState} from 'react';
import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {FaUserAstronaut, IoIosArrowBack} from "react-icons/all";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {login} from "../../actions/auth";
import PropTypes from "prop-types";

const SignIn = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData


    const loginHandler = (e) => {
        e.preventDefault()
        login(email, password)
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    if (isAuthenticated) {
        return <Redirect to={'/dashboard'} />
    }

    return (
        <div className={'register'}>
            <Container>
                <Link to={'/'}>
                    <Button style={{display: 'flex', alignItems: 'center'}}>
                        <IoIosArrowBack /> Go Back
                    </Button>
                </Link>
                <Paper elevation={5} className={'paper'}>
                    <form onSubmit={loginHandler}>
                        <Typography variant={'h4'} style={{color: '#1976D2'}}>Log in</Typography>
                        <Typography variant={'overline'} style={{color: '#1976D2'}}>
                            <FaUserAstronaut size={'1.5em'}/> Log in your account
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            type={'email'}
                            variant="outlined"
                            className={'input-form'}
                            name={'email'}
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            type={'password'}
                            variant="outlined"
                            className={'input-form'}
                            name={'password'}
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                        <Button sx={{ mt: 2 }} type={'submit'}>Sign in</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(SignIn);