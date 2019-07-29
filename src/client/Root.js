import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../shared/App';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Test from '../test';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/test" component={Test} />
            </Switch>
        </Router>
    )
};

export default Root;