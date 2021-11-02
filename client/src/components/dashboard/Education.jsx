import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
    createTheme, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow, ThemeProvider,
    Typography
} from "@mui/material";
import ResponsiveDialog from "../layout/Confirm";
import {deleteEducation} from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const educations = education.map(edu => (
        <TableRow key={edu._id}>
            <TableCell color={'black'}>{edu.school}</TableCell>
            <TableCell color={'black'}>{edu.degree}</TableCell>
            <TableCell>
                <Moment format={'YYYY/MM/DD'}>
                    {edu.from}
                </Moment> - {edu.to === null ? ' Now' : (
                <Moment format={'YYYY/MM/DD'}>
                    {edu.to}
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
                        deleteEducation(edu._id)
                    }}
                />
            </TableCell>
        </TableRow>
    ))

    return (
        <Fragment>
            <Typography variant={'h5'} component={'span'}>Education Credentials</Typography>
            <ThemeProvider theme={
                createTheme({
                    palette: {mode: 'dark' }
                })}>
                <Paper elevation={4}>
                    <TableContainer sx={{ maxHeight: 440, mt: 2, mb: 4 }}>
                        <Table stickyHeader aria-label="hover table">
                            <TableHead>
                                <TableCell>school</TableCell>
                                <TableCell>Degree</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell />
                            </TableHead>
                            <TableBody>
                                {educations}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>

        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(
    null,
    { deleteEducation }
)(Education);