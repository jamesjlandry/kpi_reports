import React, { useState } from 'react'
import './App.css';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import EditProfile from './components/EditProfile'
import Dashboard from './components/Dashboard'
import LogIn from './components/LogIn.js'




function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;







