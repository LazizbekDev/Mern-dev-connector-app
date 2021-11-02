import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import {Container, List, ListItem, Typography} from "@mui/material";
import {Loader} from "../layout/Spinner";
import {Alert, AlertTitle} from "@mui/lab";
import {AiFillGithub} from "react-icons/all";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos, username])
    return (
        <Container sx={{mt: 5}}>
            <Typography variant={'h5'}>Github repos</Typography>
            {repos === null ? <Loader /> : (
                repos.map(repo => (
                    <Alert sx={{mt: 1, mb: 1}} key={repo._id} icon={<AiFillGithub size={'1.5rem'} />} severity="success" color="info">
                        <AlertTitle>
                            <a href={repo.html_url} target={'_blank'} rel={'noreferrer'}>
                                {repo.name}
                            </a>
                        </AlertTitle>
                        <Typography variant={'caption'}>
                            {repo.description}
                        </Typography>
                        <>
                            <List>
                                <ListItem>
                                    ⭐{repo.stargazers_count}
                                </ListItem>
                                <ListItem>
                                    👀{repo.watchers_count}
                                </ListItem>
                                <ListItem>
                                   ✔ {repo.forks_count}
                                </ListItem>
                            </List>
                        </>
                    </Alert>
                ))
            )}
        </Container>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(
    mapStateToProps,
    { getGithubRepos }
)(ProfileGithub);