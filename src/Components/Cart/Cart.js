import React from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { getCart } from '../../Store/cartReducer';
/* import { deleteProduct } from '../../Store/cartReducer'; */
import axios from 'axios';
/* import Stripe from './Stripe'; */

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            cart: [],
            cart_item_id: []
        }
        this.getCart = this.getCart.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
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

    deleteProduct(cart_item_id) {
        axios.delete(`/cart/product/${cart_item_id}`)
        /* console.log(axios.delete) */
        .then(res => console.log(res))
        .catch( err => console.log(err));
      }

    /* editCart = (id) => {
        const {quantity} = this.state
        axios.put(`/api/movies/title/${id}`, {title})
        .then( res => {
          this.setState({
            movies: res.data,
            title: ""
          })
        }).catch(err => console.log(err))
      } */

    render(){
        let cartInventory = this.state.cart.map(e => {
            return <div className="bunch">
                    <div>Title: {e.title}</div>
                    <div>Price: ${e.price}</div>
                    <div>Quantity: {e.quantity}</div>
                    <button onClick={(/* e */) => this.deleteProduct(/* e.cart_item_id */)}>Delete</button>
                    <button>Edit</button>
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