import React from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../shared/App';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Search from '../pages/search';
import Main from '../pages/main';
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
                <Route path="/main/:pageId" component={Main} />
            </Switch>
        </Router>
    )
};

export default Root;