import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { FcApproval } from "react-icons/all";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { withRouter } from "react-router-dom";
import {
    Button, Checkbox,
    Container, FormControlLabel,
    FormHelperText,
    TextField,
    Typography
} from "@mui/material";

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: null,
        to: null,
        current: false,
        description: '',
    })

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData

    const changeValue = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const changeDate = (name,e) => {
        setFormData({
            ...formData,
            [name]: e
        })
        console.log(e)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addExperience(formData, history)
    }


    return (
        <Container>
            <Typography variant={'overline'} component={'h4'} style={{display: 'flex', alignItems: 'center', marginTop: '2rem', color: '#6b6b6b'}}>
                <FcApproval size={'1.50rem'} /> create a professional profile for others to know about you
            </Typography>

            <form onSubmit={e => onSubmit(e)}>

                <TextField
                    label="Job title"
                    name={'title'}
                    onChange={(e) => changeValue(e)}
                    variant="standard"
                    sx={{mt: 3}}
                    value={title}
                />

                <TextField
                    label="Company name"
                    variant="standard"
                    name={'company'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    aria-valuemax={3}
                    value={company}
                />
                <FormHelperText>Company is required</FormHelperText>

                <TextField
                    label="Address"
                    variant="standard"
                    name={'location'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={location}
                />
                <FormHelperText>Enter your location</FormHelperText>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="From job date"
                        onChange={(e) => changeDate('from', e)}
                        value={from}
                        maxDate={new Date()}
                        minDate={new Date('01/01/1970')}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                required={false}
                                sx={{mt: 3}}
                                {...params} />
                        )}
                    />
                </LocalizationProvider>

                <FormControlLabel sx={{mt: 3}} control={
                    <Checkbox
                        checked={current}
                        name={'current'}
                        onChange={() => {
                            setFormData({
                                ...formData,
                                current: !current
                            })}
                        }
                    />
                } label="Current job" style={{userSelect: 'none'}} />

                {!current && (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="To date"
                            onChange={(e) => changeDate('to', e)}
                            value={!current && to}
                            maxDate={new Date()}
                            minDate={from}
                            renderInput={(params) => (
                                <TextField
                                    variant="standard"
                                    sx={{mt: 3}}
                                    {...params} />
                            )}
                        />
                    </LocalizationProvider>
                )}

                <TextField
                    label="Description"
                    variant="standard"
                    name={'description'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={description}
                />
                <FormHelperText>Job description</FormHelperText>

                <Button variant={'outlined'} type={'submit'} sx={{ mt:5 }}>Save</Button>
            </form>
        </Container>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(
    null,
    {addExperience}
)(withRouter(AddExperience))