import React, {Fragment, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow, Typography
} from "@mui/material";
import ResponsiveDialog from "../layout/Confirm";
import {deleteExperience} from "../../actions/profile";

const Experiences = ({ experience, deleteExperience }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const experiences = experience.map(exp => (
        <TableRow key={exp._id}>
            <TableCell color={'black'}>{exp.company}</TableCell>
            <TableCell color={'black'}>{exp.title}</TableCell>
            <TableCell>
                <Moment format={'YYYY/MM/DD'}>
                    {exp.from}
                </Moment> - {exp.to === null ? ' Now' : (
                <Moment format={'YYYY/MM/DD'}>
                    {exp.to}
                </Moment>
            )}
            </TableCell>
            <TableCell>
                <ResponsiveDialog
                    title={'Delete'}
                    handleClose={handleClose}
                    open={open}
                    handleClick={handleClickOpen}
                    deleteBtn={() => {
                        setOpen(false)
                        deleteExperience(exp._id)
                    }}
                />
            </TableCell>
        </TableRow>
    ))

    return (
        <Fragment>
            <Typography variant={'h5'} component={'span'}>Experiences Credentials</Typography>
            <Paper elevation={4}>
                <TableContainer sx={{ maxHeight: 440, mt: 2, mb: 4 }}>
                    <Table stickyHeader aria-label="hover table">
                        <TableHead>
                            <TableCell>Company</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell />
                        </TableHead>
                        <TableBody>
                            {experiences}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Fragment>
    );
};

Experiences.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(
    null,
    {deleteExperience}
)(Experiences);