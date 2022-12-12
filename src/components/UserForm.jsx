import '../components/UserForm.css'

const UserForm = ({ page,usernameFieldChange,passwordFieldChange,onSubmit }) => {
    if(page==='home') {
        return(
            <>Hello</>
        );
    }
    return(
        <div className='form'>
            <div className='field'>
                <h6 className='label'>username</h6>
                <input type='text' id='usernameField' onChange={usernameFieldChange}/>
            </div>
            <div className='field'>
                <h6 className='label'>password</h6>
                <input type='password' id='passwordField' onChange={passwordFieldChange}/>
            </div>
            <h3 className='submitButton' onClick={onSubmit}>{page} ➤➤</h3>
        </div>
    );
}

export default UserForm;