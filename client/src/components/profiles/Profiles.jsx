import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getProfiles} from "../../actions/profile";
import {Loader} from "../layout/Spinner";
import {Container, Paper, Table, TableCell, TableContainer, TableHead, Typography} from "@mui/material";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: {profiles, loading}, getProfiles }) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <Fragment>
            {loading ? <Loader /> : (
               <Container>
                   <Typography variant={'caption'}>Developers Table</Typography>

                   <Paper elevation={4}>
                       {!loading && profiles.length > 0 ? (
                           <TableContainer sx={{ maxHeight: 440, mt: 2, mb: 4 }}>
                               <Table stickyHeader aria-label="hover table">
                                   <TableHead>
                                       <TableCell>Image</TableCell>
                                       <TableCell>Name</TableCell>
                                       <TableCell>Status</TableCell>
                                       <TableCell>Location</TableCell>
                                       <TableCell>Skills</TableCell>
                                       <TableCell>Link</TableCell>
                                   </TableHead>
                                   {profiles.map(profile => (
                                       <ProfileItem key={profile._id} profile={profile}/>
                                   ))}
                               </Table>
                           </TableContainer>
                       ) : (
                           <Typography color={'crimson'}>
                               No Profile found
                           </Typography>)}
                   </Paper>
               </Container>
            )}
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(
    mapStateToProps,
    { getProfiles },
)(Profiles);