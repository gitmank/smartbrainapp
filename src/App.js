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
      page: 'register',
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

  onHomeClick = () => {
    this.setState({ page: 'home' });
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

  updateCount = async () => {
    let success = await fetch('http://192.168.0.101:6969/updateCount', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.authenticatedUser, count: this.state.count })
    })
    .then(response => response.json())
    .then(result => { return result })
    .catch(error => { return false })
    if(success) this.setState({ count: this.state.count-1 })
  }

  getColors = async (imageURL) => {
    const colors = await fetch('http://192.168.0.101:6969/analyseImage', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({link: imageURL})
    })
    .then(response => response.json())
    .then(data => { return data.colors })
    .catch(error => { return false});
    // update page
    if(colors !== undefined) {
      this.setState({ page: 'results' });
      this.updateCount();
      return colors;
    }
    else return false;
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
          onHomeClick={this.onHomeClick} 
          page={this.state.page}
        />
        <UserForm 
          page={this.state.page} 
          authenticateUser={this.authenticateUser}
          createUser={this.createUser}
        />
        <Home 
          page={this.state.page} 
          getColors={this.getColors} 
          count={this.state.count}
        />
      </div>
    );
  }
}

export default App;
