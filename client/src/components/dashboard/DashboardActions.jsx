import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {AiFillExperiment, AiOutlineEdit, FaSchool} from "react-icons/all";

const DashboardActions = () => {
    return (
        <div>
            <Link to={'/edit-profile'}>
                <Button variant={'outlined'} sx={{ mr: 1}}>
                    Edit Profile <AiOutlineEdit size={'1rem'} />
                </Button>
            </Link>
            <Link to={'/add-experience'}>
                <Button variant={'outlined'} sx={{ mr: 1}}>
                    Add experience <AiFillExperiment size={'1rem'} />
                </Button>
            </Link>
            <Link to={'/add-education'}>
                <Button variant={'outlined'} sx={{ mr: 1}}>
                    Add education <FaSchool size={'1rem'} />
                </Button>
            </Link>
        </div>
    );
};

export default DashboardActions;