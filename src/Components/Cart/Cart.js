import React from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { getCart } from '../../Store/cartReducer';
import axios from 'axios';
/* import Stripe from './Stripe'; */

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            cart: []
        }
        this.getCart = this.getCart.bind(this)
    }

    componentDidMount(){
        this.getCart()
    }

    getCart() {
        axios.get("/cart/inventory").then(res => {
            this.setState({
                cart: res.data
            })
        }).catch(err => console.log(err))
    }

    render(){
        let cartInventory = this.state.cart.map(e => {
            return <div className="bunch">
                    <div>Title: {e.title}</div>
                    <div>Price: ${e.price}</div>
                    <div>Quantity: {e.quantity}</div>
                  </div>
        })
        return (
            <div className="cart-container">
            <h3 className="welcome">Welcome To Your Cart</h3>
            <div className="cart_inventory">
            {cartInventory}
            </div>
            {/* <Stripe/> */}
         </div>
        )
    }
}    

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getCart})(Cart);