import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Fab,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
}}) => {

    return (
        <Container>
            <Paper elevation={4}>
                <TableContainer sx={{ maxHeight: 440, mt: 2, mb: 4 }} component={Paper}>
                    <Table stickyHeader aria-label="hover table">
                        <TableHead>
                            <TableCell align={'center'}>{name.trim().split(' ')[0]}s bio</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align={'center'}>
                                    <Typography variant={'body2'} component={'i'}>{bio}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer sx={{mt: 5}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableCell align={'center'}>Skills</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align={'center'}>
                                    <Stack justifyContent={'space-evenly'} direction="row" spacing={2} sx={{mt:4}}>
                                        {skills.map(skill => (
                                            <Fab key={skill}>
                                                {skill}
                                            </Fab>
                                        ))}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;