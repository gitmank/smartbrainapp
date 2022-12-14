import './App.css';
import { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isUserAuthenticated: false,
      page: 'login',
      authenticatedUser: '',
      count: 0,
    }
  }

  onClickLogin = () => {
    this.setState({ page: 'login' })
  }

  onClickRegister = () => {
    this.setState({ page: 'register' });
  }

  onClickLogout = () => {
    this.setState({ 
      authenticatedUser: '', 
      isUserAuthenticated: false, 
      page: 'login', 
    })
  }

  authenticateUser = async (givenUsername, givenPassword) => {
    let returnedUser = await fetch('http://192.168.0.101:6969/authenticate', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: givenUsername, password: givenPassword})
    })
    .then(response => response.json())
    .then(data => { return data })
    let authSuccess = returnedUser.isAuthenticated;
    if(authSuccess) {
      this.updateCurrentUser(returnedUser);
      this.setState({ page: 'home' });
    }
    return authSuccess;
  }

  updateCurrentUser = (returnedUser) => {
    this.setState({ 
      authenticatedUser: returnedUser.username, 
      count: returnedUser.count, 
      isUserAuthenticated: returnedUser.isAuthenticated,
    });
  }

  createUser = async (givenUsername, givenPassword) => {
    let regSuccess = await fetch('http://192.168.0.101:6969/addUser', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: givenUsername, password: givenPassword})
    })
    .then(response => response.json())
    .then(data => { return data })
    return regSuccess;
  }

  updateCount = () => {
    // update count route not ready in API
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar 
          isUserAuthenticated={this.state.isUserAuthenticated} 
          username={this.state.authenticatedUser} 
          onClickLogin={this.onClickLogin} 
          onClickRegister={this.onClickRegister} 
          onClickLogout={this.onClickLogout} 
          page={this.state.page}
        />
        <UserForm 
          page={this.state.page} 
          authenticateUser={this.authenticateUser}
          createUser={this.createUser}
        />
        <Home page={this.state.page} updateCount={this.updateCount} />
      </div>
    );
  }
}

export default App;
