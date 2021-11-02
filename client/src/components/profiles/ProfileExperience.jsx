import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from "@mui/material";
import Moment from "react-moment";

const ProfileExperience = ({ experience: {
    company, location, to, from, current, title, description
} }) => {
    return (
        <TableRow
            key={'row.name'}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {company}
            </TableCell>
            <TableCell>{location}</TableCell>
            <TableCell>
                <Moment format={'YYYY-MM-DD'} date={from} />
            </TableCell>
            {to !== null ? <TableCell>
                <Moment format={'YYYY-MM-DD'} date={to} />
            </TableCell> : <TableCell />}
            {current ? <TableCell>TRUE</TableCell> : <TableCell />}
            <TableCell>{title}</TableCell>
            <TableCell>{description}</TableCell>
        </TableRow>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
};

export default ProfileExperience;