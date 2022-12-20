import '../components/Navbar.css'

const Navbar = ({isUserAuthenticated, username, onClickLogin, onClickRegister, onClickLogout, page, onHomeClick}) => {
    if(isUserAuthenticated) {
        return(
            <div className="navbar">
                <strong>Hello {username}!</strong>
                <div className='actionbar'>
                    <strong className='clickable' onClick={onHomeClick}>Home</strong>
                    <strong className='clickable' onClick={onClickLogout}>Logout</strong>
                </div>
            </div>
        );
    }
    else {
        return(
            <>
            <div className="navbar">
                <strong>Do something --→ </strong>
                <div className='actionbar'>
                    <strong style={{color: ((page==='register')? 'grey':'black')}} className='clickable' onClick={onClickLogin}>Login</strong>
                    <strong style={{color: ((page==='login')? 'grey':'black')}} className='clickable' onClick={onClickRegister}>Register</strong>
                </div>
            </div>
            </>
        );
    }
}

export default Navbar;