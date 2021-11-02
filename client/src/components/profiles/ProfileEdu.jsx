import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from "@mui/material";
import Moment from "react-moment";

const ProfileEdu = ({ education: {
    school, degree, to, from, current, description
} }) => {
    return (
        <TableRow
            key={'row.name'}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {school}
            </TableCell>
            <TableCell>{degree}</TableCell>
            <TableCell>
                <Moment format={'YYYY-MM-DD'} date={from} />
            </TableCell>
            {to !== null ? <TableCell>
                <Moment format={'YYYY-MM-DD'} date={to} />
            </TableCell> : <TableCell />}
            <TableCell>{current ? 'TRUE' : 'FALSE'}</TableCell>
            <TableCell>{description}</TableCell>
        </TableRow>
    );
};

ProfileEdu.propTypes = {
    education: PropTypes.object.isRequired,
};

export default ProfileEdu;