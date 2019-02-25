import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Datacollection from './Datacollection';
import Train from './Train';
import Test from './Test';
import Visualization from './Visualization';

class RouterIndex extends Component {
    render() {
        return (
             <BrowserRouter>
                <Switch>
                    <Route path="/model" component={Test} exact/>
                    <Route path="/" component={Datacollection} exact/>
                    <Route path="/visualization" component={Visualization} exact/>
                </Switch>
             </BrowserRouter>
        );
    }
}

export default RouterIndex;