import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getPost } from "../../actions/posts";
import {Loader} from "../layout/Spinner";
import PostItem from "./PostItem";
import PostComment from "./PostComment";
import PostCommentItem from "./PostCommentItem";

const Post = ({getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id)
        // eslint-disable-next-line
    }, [getPost])
    return loading || post === null ? <Loader /> : (
        <>
            <PostItem post={post} showActions={false} />
            <PostComment postId={post._id} />
            <>
                {post.comments.map(comment => (
                    <PostCommentItem comment={comment} postId={post._id}/>
                ))}
            </>
        </>
    )
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(
    mapStateToProps,
    { getPost }
)(Post);