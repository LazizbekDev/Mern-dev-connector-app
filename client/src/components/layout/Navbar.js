import React, {Fragment, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {DiGitBranch, IoLogOutOutline, MdMenu} from "react-icons/all";
import ResponsiveDialog from "./Confirm";
import {deleteAccount} from "../../actions/profile";

const Navbar = ({ auth: {isAuthenticated, loading}, logout, deleteAccount }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);
    const [opens, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true)
    const closeHandle = () => setOpen(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={'brand'}>
                        <Link to={'/'}>
                            Dev Connector
                        </Link>
                    </Typography>

                    <Fragment>

                            <Button
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MdMenu size={'1.40rem'}/>
                            </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {!loading && (
                                <Fragment>
                                    {!isAuthenticated ? (
                                        <>
                                            <Link to={'/profiles'}>
                                                <MenuItem onClick={handleClose} className={'nav-items'}>Developers</MenuItem>
                                            </Link>
                                            <Link to={'/register'}>
                                                <MenuItem onClick={handleClose} className={'nav-items'}>Register</MenuItem>
                                            </Link>
                                            <Link to={'/login'}>
                                                <MenuItem onClick={handleClose} className={'nav-items'}>Login</MenuItem>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={'/dashboard'} style={{display: 'flex', alignItems: 'center'}}>
                                                <MenuItem onClick={handleClose} className={'nav-items'}>
                                                    Dashboard <DiGitBranch size={'1.30rem'} />
                                                </MenuItem>
                                            </Link>
                                            <Link to={'/profiles'} style={{display: 'flex', alignItems: 'center'}}>
                                                <MenuItem onClick={handleClose} className={'nav-items'}>Developers</MenuItem>
                                            </Link>
                                            <MenuItem onClick={handleClose} className={'nav-items'}>
                                                <Link to={'/posts'} style={{display: 'flex', alignItems: 'center'}}>
                                                    Posts
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    logout()
                                                    handleClose()
                                                }}
                                                className={'nav-items'}>
                                                Logout <IoLogOutOutline />
                                            </MenuItem>
                                            <MenuItem>
                                                <ResponsiveDialog
                                                    className={'nav-items'}
                                                    title={'Delete'}
                                                    handleClose={closeHandle}
                                                    open={opens}
                                                    handleClick={handleClickOpen}
                                                    deleteBtn={() => {
                                                        setOpen(false)
                                                        deleteAccount(opens)
                                                    }}
                                                />
                                            </MenuItem>
                                        </>
                                    )
                                    }
                                </Fragment>
                            )}
                        </Menu>
                    </Fragment>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout, deleteAccount }
)(Navbar);