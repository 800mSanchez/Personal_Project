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
            return <div>
                {e.title} {e.price}
                {e.quantity}
            </div>
        })
        return (
        <div className="cart-container">
            <div className="welcome">Welcome To Your Cart</div>
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