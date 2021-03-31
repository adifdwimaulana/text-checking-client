import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import store from './redux/store'

import Home from './view/Home/index'

import './App.css'
import './scss/custom.scss'

function App(){
  return(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" name="Home" component={Home} />
        </Switch>
      </HashRouter>
    </Provider>
  )
}

export default App;
