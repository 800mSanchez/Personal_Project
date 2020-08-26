import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Components/Login/Login';
import Store from './Components/Store/Store';
import Cart from './Components/Cart/Cart';

export default (
    <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/cart' component={Cart} />  
        <Route path='/storefront' component={Store} />
    </Switch>
)