import React, {Fragment} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    IconButton,
    Typography
} from "@mui/material";
import {AiOutlineDelete, AiOutlineDislike, AiOutlineLike, GoCommentDiscussion} from "react-icons/all";
import {connect} from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {addLike, deletePost, removeLike} from "../../actions/posts";

const PostItem = ({  deletePost, addLike, removeLike, auth, post: { _id, name, text, avatar, likes, comments, date, user }, showActions=true }) => {
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
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between'}}>
                        {showActions && (
                            <Fragment>
                                <div>
                                    <IconButton aria-label="add to favorites" onClick={() => addLike(_id)}>
                                        <AiOutlineLike />{' '} <sub>{likes.length}</sub>
                                    </IconButton>
                                    <IconButton aria-label="share" onClick={() => removeLike(_id)}>
                                        <AiOutlineDislike />
                                    </IconButton>
                                    <Link to={`post/${_id}`}>
                                        <IconButton>
                                            <GoCommentDiscussion /> {comments.length > 0 && comments.length}
                                        </IconButton>
                                    </Link>
                                </div>
                                {!auth.loading && user === auth.user._id && (
                                    <IconButton sx={{ color: 'crimson' }} onClick={() => deletePost(_id)}>
                                        <AiOutlineDelete />
                                    </IconButton>
                                )}
                            </Fragment>
                        )}
                    </CardActions>
                </div>
            </Card>
        </Container>
    );
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { addLike, removeLike, deletePost }
)(PostItem);