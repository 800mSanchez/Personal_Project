import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../Store/reducer';
import './Login.css';

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            newUser: false
        }

    }
    
    toggle = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password}).then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/storefront')
        }).catch(err => {
            console.log(err);
            alert('Login Failed')
        })
    }

    register = () => {
        const {email, password} = this.state;
        axios.post('/auth/register', {email, password}).then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/storefront');
        }).catch(err => {
            console.log(err);
            alert('Register Failed')
        })
    }
    
    render(){
        const {email, password} = this.state;
        return <div className="log">
                <div className="login-container">
                    <h1>Locale</h1>
                        <h2 className="text">Shop local, nationwide!</h2>
                    {!this.state.newUser ?
                    <div>
                       <input className="email" onChange={e => this.changeHandler(e)} name="email" type="text" value={email} placeholder="Email"/>
                       <input className="password" onChange={e => this.changeHandler(e)} name="password" type="password" value={password} placeholder="Password"/>  
                    <div className="button">
                        <button className="log-btn" onClick={this.login}>Login</button>
                        <button className="sign-btn" onClick={this.toggle}>Sign Up</button>
                    </div>
                </div>
            :
            <div>
                <input className="email_two" onChange={e => this.changeHandler(e)} name="email" type="text" value={email} placeholder="Email"/>
                <input className="password_two" onChange={e => this.changeHandler(e)} name="password" type="password" value={password} placeholder="Password"/>
                <div>
                    <button className="register_btn" onClick={this.register}>Register</button>
                </div>
        </div>
    }
    </div>
   </div> 
}
}

const mapStateToProps = state => state;

export default connect (mapStateToProps, {loginUser})(Login);