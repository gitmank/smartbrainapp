import './App.css';
import React from 'react';
import Header from './components/Header'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isUsersignedIn: false,
      page: 'login',
      authenticatedUser: '',
      usernameField: '',
      passwordField: '',
    }
  }

  onClickLogin = () => {
    this.setState({ page: 'login' })
  }

  onClickRegister = () => {
    this.setState({ page: 'register' });
  }

  usernameFieldChange = (event) => {
    this.setState({ usernameField: event.target.value });
  }

  passwordFieldChange = (event) => {
    this.setState({ passwordField: event.target.value });
  }

  authenticateUser = () => {
    let { usernameField, passwordField } = this.state;
    let userObject = {
      username: usernameField,
      password: passwordField,
    }
    if ((usernameField !== '') && (passwordField !== '')) {
      if(this.state.page === 'register') {
        fetch('http://192.168.0.101:6969/addUser', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userObject),
        })
      }
      fetch('http://192.168.0.101:6969/authenticate', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userObject),
      })
      .then(response => response.json())
      .then(data => this.setState({ 
        authenticatedUser: data.username,
        isUsersignedIn: true, 
        page: 'home', 
        usernameField: '', 
        passwordField: '' 
      }))
    }
  }

  onClickLogout = () => {
    this.setState({ authenticatedUser: '', isUsersignedIn: false, page: 'login', usernameField: '', passwordField: '' })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar isUsersignedIn={this.state.isUsersignedIn} username={this.state.authenticatedUser} onClickLogin={this.onClickLogin} onClickRegister={this.onClickRegister} onClickLogout={this.onClickLogout} page={this.state.page}/>
        <UserForm page={this.state.page} usernameFieldChange={this.usernameFieldChange} passwordFieldChange={this.passwordFieldChange} onSubmit={this.authenticateUser}/>
      </div>
    );
  }
}

export default App;
