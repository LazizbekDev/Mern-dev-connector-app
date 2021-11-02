import React from 'react';
import Alert from "../layout/Alert";
import {Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import SignIn from "../auth/SignIn";
import Profiles from "../profiles/Profiles";
import Profile from "../profiles/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateProfile from "../dashboard/CreateProfile";
import Dashboard from "../dashboard/Dashboard";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../posts/Post";

const Routes = () => {
    return (
        <section>
            <Alert />
            <Switch>
                <Route exact path={'/register'} component={Register} />
                <Route exact path={'/login'} component={SignIn} />
                <Route exact path={'/profiles'} component={Profiles} />
                <Route exact path={'/profile/:id'} component={Profile} />
                <PrivateRoute exact path={'/create-profile'} component={CreateProfile} />
                <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
                <PrivateRoute exact path={'/edit-profile'} component={EditProfile} />
                <PrivateRoute exact path={'/add-experience'} component={AddExperience} />
                <PrivateRoute exact path={'/add-education'} component={AddEducation} />
                <PrivateRoute exact path={'/posts'} component={Posts} />
                <PrivateRoute exact path={'/post/:id'} component={Post} />
            </Switch>
        </section>
    );
};

export default Routes;