import React, {useState} from 'react';
import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import './auth.css'
import {FaUserAstronaut, IoIosArrowBack} from "react-icons/all";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {setAlert} from "../../actions/alert";
import PropTypes from 'prop-types'
import {register} from "../../actions/auth";

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    const {name, email, password, confirmPass} = formData

    const registerHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPass) {
            setAlert('password do not match', 'warning')
        } else {
            register({ name, email, password})
            // return toast.success('Successfully logged in your account')
           /* const newUser = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser)

                const res = await axios.post('/api/users', body, config)
                console.log(res.data)
            } catch (err) {
                console.log(err.response.data)
            }*/
        }
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
                    <form onSubmit={registerHandler}>
                        <Typography variant={'h4'} style={{color: '#1976D2'}}>Register</Typography>
                        <Typography variant={'overline'} style={{color: '#1976D2'}}>
                            <FaUserAstronaut size={'1.5em'}/> Create your account
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            className={'input-form'}
                            name={'name'}
                            value={name}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            type={'email'}
                            variant="outlined"
                            helperText={<>
                                If you want a profile image, use a {' '}
                                <a 
                                    style={{textDecoration: 'underline', color: 'lightblue'}}
                                    href='https://gravatar.com/' 
                                    target='_blank' rel='noreferrer'
                                    className='link'
                                    >GRavatar</a> email
                            </>}
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
                        <TextField
                            id="outlined-basic"
                            label="Confirm Password"
                            type={'password'}
                            variant="outlined"
                            className={'input-form'}
                            name={'confirmPass'}
                            value={confirmPass}
                            onChange={(e) => onChange(e)}
                        />
                        <Button sx={{ mt: 2 }} type={'submit'}>Sign up</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { setAlert, register })(Register);