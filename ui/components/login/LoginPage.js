import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Input, Button} from '../common-pattern';
import {verifyUserCredential} from '../../actions/async/loginActions';
import './LoginPage.css'

class LoginPage extends Component {
    constructor(){
        super();
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.username;
        this.password;
        this.state = { isUsernameInvalid: false, isPasswordInvaild: false };
    }

    setUsername(username){ this.username = username }
    setPassword(password){ this.password = password }

    onClickLogin(){
        this.setState({ isUsernameInvalid: !this.username, isPasswordInvaild: !this.password});
        if(this.username && this.password) {
            this.props.verifyUserCredential(this.username, this.password);
        } 
    }

    render() {
        const {isUsernameInvalid, isPasswordInvaild} = this.state;
        if(this.props.username) return <Redirect to={`/${this.props.username}`}></Redirect>
        return (
            <div className='login-page'>
                <h2>Login</h2>
                {this.props.isError && <h4 className='credential-hint' style={{color: 'darkRed'}}>{this.props.loginErrorMsg}</h4>}
                <Input
                    className='mg-b-10'
                    label='Username' 
                    type='text'
                    isRequired={true}
                    requiredText='username is required.'
                    isError={isUsernameInvalid}
                    errorText={'it can not be empty.'}
                    getInputValue={this.setUsername}
                />
                <Input
                    className='mg-b-10'
                    label='Password' 
                    type='password'
                    isRequired={true}
                    requiredText='password is required.'
                    isError={isPasswordInvaild}
                    errorText={'it can not be empty.'}
                    getInputValue={this.setPassword}
                />
                <div className='credential-hint'>
                    <div>i.e. username: Biggs Darklighter , password: 24BBY</div>
                    <b>Credentials are catched and valid for 5 minutes.</b>
                </div>
                <Button 
                    label='Login'
                    className='full-wd mg-t-10'
                    type='btn-pm'
                    onClick={this.onClickLogin}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.login.username,
    isError: state.login.isError,
    isLoading: state.login.isLoading,
    loginErrorMsg: state.login.loginErrorMsg
})

const mapDispatchToProps = (dispatch) => ({
    verifyUserCredential: (username, password) => dispatch(verifyUserCredential(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);