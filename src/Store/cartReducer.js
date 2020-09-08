import axios from 'axios';

const initialState = {
    cart: [],
    loading: false,
    errormessage: ""
};

const GET_CART = "GET_CART";

export function getCart(){
    const cart = axios.get('/cart/inventory')
    console.log(cart)
    return {
        type: GET_CART,
        payload: cart
    }
}

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
      default:
        return state;
    }
  }