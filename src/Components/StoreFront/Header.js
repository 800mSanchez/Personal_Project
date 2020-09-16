import React from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutUser, getUser} from '../../Store/reducer';
import axios from 'axios';

class Header extends React.Component {

    componentDidMount(){
        this.props.getUser();
    }

    logout = () => {
        axios.get('/auth/logout').then( res => {
            this.props.logoutUser();
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }

    render(){
        return <header>
            <div className='header-container'>
            <h1>Locale</h1>
                <div className="logout">
                 <button className="logout-btn" onClick={this.logout}><Link to="/">Logout</Link></button>
                </div>
                <div className="cart">
                 <button className="cart-btn" onClick={this.cart}><Link to = "/cart">Cart</Link></button>
                </div>
            </div>
        </header>
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUser})(Header);