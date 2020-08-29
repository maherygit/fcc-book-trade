import React, {useContext} from 'react';

import NavBar from './navBar';
import UserLogin from './userLogin';
import Books from './books';
import Users from './users';
import Alert from './UI/CAlert'
import {useStateValue} from '../state/appStateProvider';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './layout.css';

const Layout = props => {
  const [flashMessage] = useStateValue().flash;
  
  return (
      <div className="layout_container">
        <Router>      
          <nav className="layout_header">
            <NavBar/>
          </nav>
          <div className="layout_main">
            <main className="layout_main_center">
              {
                flashMessage.message && 
              (<Alert kind={flashMessage.kind} centered={true}>
                {flashMessage.message}
              </Alert>)
              }
              <Switch>
                  <Route path="/users/index">
                    <Users />
                  </Route>
                  <Route path="/books/index">
                    <Books />
                  </Route>                    
                  <Route>
                    <Books />
                  </Route>                
                </Switch>
            </main>
            <aside className="layout_main_right_col">
              <UserLogin />
            </aside>
          </div>
        </Router>
      </div>
  );
}

export default Layout;