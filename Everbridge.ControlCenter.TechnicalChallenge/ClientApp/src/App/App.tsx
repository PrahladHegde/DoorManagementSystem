import * as React from 'react';
import { Home } from '../Components/Home';
import { Welcome } from '../Components/Welcome';
import { Configuration } from '../Components/Configuration';
import { Settings } from '../Components/Settings';
import { AddDoor } from '../Components/AddDoor';

import { Navigation } from '../Components/Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return(
        <BrowserRouter>
            <div className="container">
                <h3>Door Management Center</h3>
                <Navigation />

                <Switch>
                    <Route exact path='/' component={Welcome} />
                    <Route path='/Home' component={Home} />
                    <Route path='/Configuration' component={Configuration} />
                    <Route path='/addDoor' component={AddDoor} />
                    <Route path='/Settings' component={Settings} />
                </Switch>
            </div>

            </BrowserRouter>

    );
}

export default App;