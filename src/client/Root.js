import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../shared/App';
import Login from '../pages/login';
import Signup from '../pages/signup';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    )
};

export default Root;