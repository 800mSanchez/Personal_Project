import axios from 'axios';

const initialState = {
    cart: [],
    loading: false,
    errormessage: ""
};

const GET_CART = "GET_CART";
/* const DELETE_PRODUCT = "DELETE_PRODUCT" */

export function getCart(){
    const cart = axios.get('/cart/inventory')
    console.log(cart)
    return {
        type: GET_CART,
        payload: cart
    }
}

/* export function deleteProduct(){
  const cart = axios.delete(`/cart/product/:cart_item_id`)
  console.log(cart)
  return {
    type: DELETE_PRODUCT,
    payload: cart
  }
} */

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_CART + "_PENDING":
        return {
          ...state,
          loading: true,
        };
      case GET_CART + "_REJECTED":
        return {
          ...state,
          loading: false,
          errorMessage: "axios request failed",
        };
      case GET_CART + "_FULFILLED":
        return {
          cart: payload,
          loading: false,
          errorMessage: "",
        };
      /* case DELETE_PRODUCT + "_PENDING":
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT + "_REJECTED":
        return {
          ...state,
          loading: false,
          errorMessage: "axios request failed",
        };
      case DELETE_PRODUCT + "_FULFILLED":
        return {
          cart: payload,
          loading: false,
          errorMessage: "",
        }; */
      default:
        return state;
    }
  }