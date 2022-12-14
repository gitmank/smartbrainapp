import '../components/UserForm.css';
import { Component } from 'react';

class UserForm extends Component {
    constructor() {
        super()
        this.state = {
            usernameField: '',
            passwordField: '',
            errorMessage: '',
        }
    }

    usernameFieldChange = (event) => {
        if(this.state.usernameField!=='') this.setState({ errorMessage: '' });
        this.setState({ usernameField: (event.target.value).trim() });
        if(this.props.page==='register') {
            this.usernameTakenWarning(event.target.value.trim());
        }
    }

    passwordFieldChange = (event) => {
        this.setState({ passwordField: (event.target.value).trim() });
    }

    usernameTakenWarning = async (username) => {
        let usernameTaken = await fetch('http://192.168.0.101:6969/userExists', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username })
        })
        .then(response => {return response.json()})
        if(usernameTaken && this.props.page==='register') this.setState({ errorMessage: 'we\'ve already given that name away :/' });
    }

    nullFieldWarning = () => {
        let { usernameField, passwordField } = this.state;
        if(usernameField === '' || passwordField === '') {
            this.setState({ errorMessage: 'we don\'t like BLANK FIELDS! (-(-_(-_-)_-)-)' });
            return true;
        }
    }

    onSubmit = async () => {
        this.setState({ errorMessage: '' })
        if(this.nullFieldWarning()) return false;
        let { usernameField, passwordField } = this.state;
        let { page } = this.props;
        if(page==='register') {
            let regSuccess = await this.props.createUser(usernameField, passwordField);
            if(!regSuccess) {
                this.setState({ errorMessage: 'idk why but we couldn\'t create your account ¯\\_(ツ)_/¯' });
                return false;
            }
        }
        let authSuccess = await this.props.authenticateUser(usernameField, passwordField);
        if(!authSuccess) this.setState({ errorMessage: 'invalid credentials (>ლ)' })
        this.setState({ usernameField: '', passwordField: '' })
    } 

    render() {
        let { page } = this.props;
        let { errorMessage } = this.state;
        if(page==='login' || page === 'register') {
            return(
                <div className='form'>
                    <div className='field'>
                        <h6 className='label'>username</h6>
                        <input type='text' id='usernameField' onChange={this.usernameFieldChange} style={{color: (errorMessage==='')? 'white':'crimson'}}/>
                    </div>
                    <div className='field'>
                        <h6 className='label'>password</h6>
                        <input type='password' id='passwordField' onChange={this.passwordFieldChange} style={{color: (errorMessage==='')? 'white':'crimson'}}/>
                    </div>
                    <h6 className='errorMessage'>{errorMessage}</h6>
                    <h3 className='submitButton' onClick={this.onSubmit}>{page} ➤➤</h3>
                </div>
            );
        }
    }
}

export default UserForm;