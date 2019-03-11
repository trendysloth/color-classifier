import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import Datacollection from './Datacollection';
import Train from './Train';
import Test from './Test';
import Visualization from './Visualization';

class RouterIndex extends Component {
    render() {
        return (
             <HashRouter>
                <Switch>
                    <Route path="/model" component={Test} exact/>
                    <Route path="/" component={Datacollection} exact/>
                    <Route path="/visualization" component={Visualization} exact/>
                </Switch>
             </HashRouter>
        );
    }
}

export default RouterIndex;