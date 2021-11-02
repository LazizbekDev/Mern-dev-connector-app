import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getPosts} from "../../actions/posts";
import {Loader} from "../layout/Spinner";
import PostItem from "./PostItem";
import PostCreate from "./PostCreate";

const Posts = ({ getPosts, post: { posts, loading }}) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return loading ? <Loader /> : (
        <div>
            <PostCreate />
            {posts.map(post => (
                <PostItem key={post._id} post={post}/>
            ))}
        </div>
    )
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})

export default connect(
    mapStateToProps,
    { getPosts }
)(Posts);