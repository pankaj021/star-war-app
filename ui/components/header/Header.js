import React from 'react';
import {connect} from 'react-redux';
import './Header.css'

const Header = (props) => {
    return (
        <header>
            <div className='header-items'>
                <h2 className='header-title'>Star World</h2>
                {props.username && <div className='login-user'>
                    <div>Hi {props.username}</div>
                    {/* <h4 className='logout'>Logout</h4> */}
                </div>}
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    username: state.login.username
})

export default connect(mapStateToProps, null)(Header);