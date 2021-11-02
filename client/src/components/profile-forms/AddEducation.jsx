import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {addEducation} from "../../actions/profile";
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

const AddEducation = ({ addEducation, history }) => {
    // eslint-disable-next-line
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: null,
        to: null,
        current: false,
        description: '',
    })

    const {
        school,
        degree,
        fieldofstudy,
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
        addEducation(formData, history)
    }


    return (
        <Container>
            <Typography variant={'overline'} component={'h4'} style={{display: 'flex', alignItems: 'center', marginTop: '2rem', color: '#6b6b6b'}}>
                <FcApproval size={'1.50rem'} /> Add your any school or bootcamp
            </Typography>

            <form onSubmit={e => onSubmit(e)}>

                <TextField
                    label="Education"
                    name={'school'}
                    onChange={(e) => changeValue(e)}
                    variant="standard"
                    sx={{mt: 3}}
                    value={school}
                />

                <TextField
                    label="Degree"
                    variant="standard"
                    name={'degree'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    aria-valuemax={3}
                    value={degree}
                />
                <FormHelperText>Degree or  certificate</FormHelperText>

                <TextField
                    label="Field of study"
                    variant="standard"
                    name={'fieldofstudy'}
                    onChange={(e) => changeValue(e)}
                    sx={{mt: 3}}
                    value={fieldofstudy}
                />
                <FormHelperText>Field of study</FormHelperText>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="From education date"
                        onChange={(e) => changeDate('from', e)}
                        value={from}
                        maxDate={new Date()}
                        minDate={new Date('01/01/1970')}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
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
                                current: to === null && !current
                            })}
                        }
                    />
                } label="i'm Student" style={{userSelect: 'none'}} />

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
                <FormHelperText>Program description description</FormHelperText>

                <Button variant={'outlined'} type={'submit'} sx={{ mt:5 }}>Save</Button>
            </form>
        </Container>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(
    null,
    {addEducation}
)(withRouter(AddEducation))