import React from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../shared/App';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Search from '../pages/search';
import Main from '../pages/main';
import Edit from '../pages/edit';
import Log from '../pages/log'
import Test from '../test';

function requireAuth(nextState, replaceState) {
    const jwtCookie = Cookies.get('jwt');
    console.log(jwtCookie)

    if (!jwtCookie) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
}

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/test" component={Test} />
                <Route path="/search/:search" component={Search} />
                <Route path="/edit/:pageId/:pageTitle" component={Edit} />
                <Route path="/main/:pageId/:pageTitle" component={Main} />
                <Route path="/log/:pageId/:pageTitle" component={Log} />
            </Switch>
        </Router>
    )
};

export default Root;