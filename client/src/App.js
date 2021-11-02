import {Fragment, useEffect} from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import Routes from "./components/routing/Routes";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}
function App() {

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
  return (
    <Provider store={store}>
        <ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>
            <Router>
                <Fragment>
                    <div>
                        <ToastContainer />
                        <Navbar />
                        <Route exact path={'/'} component={Landing} />
                        <Route component={Routes} />
                    </div>
                </Fragment>
            </Router>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
