import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {BiListCheck} from "react-icons/all";

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
}}) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    <Avatar alt={name} src={avatar} />
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'}>
                        {name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'}>
                        {status} {company && <span><mark>Developer at</mark> {company}</span>}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'body1'} component={'address'}>
                        {location && <span>{location}</span>}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant={'overline'}>
                        {skills.slice(0,4).map((skill, i) => (
                            <div key={i}>
                                <BiListCheck/> {skill}
                            </div>
                        ))}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Link to={`/profile/${_id}`}>View Profile</Link>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;