import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../shared/App';

const Root = () => (
    <Router>
        <App />
    </Router>
);

export default Root;