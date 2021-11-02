import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addPost} from "../../actions/posts";
import {Button, TextField} from "@mui/material";
import {MdOutlinePostAdd} from "react-icons/all";

const PostCreate = ({ addPost }) => {
    const [text, setText] = useState('')
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            addPost({ text })
            setText('')
        }}>
            <TextField
                sx={{ mx: 'auto' }}
                style={{ color: '#fff', maxWidth: '90%', width: '65%', minWidth: 200 }}
                type={'text'}
                multiline={true}
                fullWidth={true}
                noValidate
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
            >Add Post <MdOutlinePostAdd /></Button>
        </form>
    );
};

PostCreate.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(
    null,
    { addPost }
)(PostCreate);