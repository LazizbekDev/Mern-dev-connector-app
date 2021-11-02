import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Snackbar} from "@mui/material";

const Alert = ({ alerts }) => {

    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id}>
            <Snackbar
                open={alerts !== null && alerts.length > 0}
                autoHideDuration={3000}
                message={alert.msg}
            />
        </div>
    ))
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)