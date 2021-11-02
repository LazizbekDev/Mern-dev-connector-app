import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addComment } from "../../actions/posts";
import {Button, TextField} from "@mui/material";
import {BiCommentAdd} from "react-icons/all";

const PostComment = ({ postId, addComment }) => {
    const [text, setText] = useState('')

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            addComment(postId, { text })
            setText('')
        }}>
            <TextField
                sx={{ mx: 'auto' }}
                style={{ color: '#fff', maxWidth: '90%', width: '65%', minWidth: 200 }}
                type={'text'}
                multiline={true}
                fullWidth={true}
                autoComplete="off"
                placeholder={'Type something...'}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <Button
                variant={'contained'}
                type={'submit'}
                style={{maxWidth: '90%', width: '65%', minWidth: 200}}
                sx={{ mx: 'auto' }}
            >Add Comment <BiCommentAdd /></Button>
        </form>
    );
};

PostComment.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(
    null,
    { addComment }
)(PostComment);