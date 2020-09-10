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
            <h4>Locale</h4>
                 <button className="logout-btn" onClick={this.logout}><Link to="/">Logout</Link></button>
                 <button className="cart-btn" onClick={this.cart}><Link to = "/cart">Cart</Link></button>
            </div>
        </header>
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUser})(Header);