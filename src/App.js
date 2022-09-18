import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route
          exact
          path="/shopping-cart"
          render={ (props) => <ShoppingCart { ...props } /> }
        />
        <Route
          exact
          path="/checkout"
          render={ (props) => <Checkout { ...props } /> }
        />
        <Route
          exact
          path="/product/:id"
          render={ (props) => <Product { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
