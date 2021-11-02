import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Avatar, Card, CardContent, CardHeader, Container, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {AiOutlineDelete} from "react-icons/all";
import { deleteComment } from "../../actions/posts";

const PostCommentItem = ({ postId, comment: {
    _id, text, name, avatar, date, user
}, auth, deleteComment }) => {
    return (
        <Container>
            <Card sx={{ maxWidth: '90%', width: '65%', minWidth: 200, my: 4, mx: 'auto' }}>
                <CardHeader
                    avatar={
                        <Avatar src={avatar} alt={name} aria-label="recipe" />
                    }
                    title={(
                        <Link to={`/profile/${user}`}>{name}</Link>
                    )}
                    subheader={(
                        <Moment format="D MMM YYYY" withTitle>{date}</Moment>
                    )}
                />
                <div>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                        {!auth.loading && user === auth.user._id && (
                            <IconButton style={{ color: 'crimson' }} onClick={() => deleteComment(postId, _id)}>
                                <AiOutlineDelete />
                            </IconButton>
                        )}
                    </CardContent>
                </div>
            </Card>
        </Container>
    );
};

PostCommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { deleteComment }
)(PostCommentItem);