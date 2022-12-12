import '../components/Navbar.css'

const Navbar = ({isUsersignedIn, username, onClickLogin, onClickRegister, onClickLogout, page}) => {
    if(isUsersignedIn) {
        return(
            <div className="navbar">
                {/* add username here */}
                <strong>Hello {username}!</strong>
                <div className='actionbar'>
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
                    <strong style={{color: ((page==='register')? 'black':'grey')}} className='clickable' onClick={onClickLogin}>Login</strong>
                    <strong style={{color: ((page==='login')? 'black':'grey')}} className='clickable' onClick={onClickRegister}>Register</strong>
                </div>
            </div>
            </>
        );
    }
}

export default Navbar;