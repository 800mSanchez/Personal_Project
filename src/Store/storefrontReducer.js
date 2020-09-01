import axios from 'axios';

const initialState = {
    user: {
        email: "",
        user_id: 0
    },
    cart: [],
    loading: false,
    errormessage: ""
};

const GET_USER = 'GET_USER';
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_TO_CART = 'ADD_TO_CART';

export function getUser(){
    const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}

export function getProducts(){
    const inventory = axios.get('/store/inventory')
    return {
        type: GET_PRODUCTS,
        payload: inventory
    }
}

export function addToCart(item){
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_USER + "_PENDING":
        return {
          ...state,
          loading: true,
        };
      case GET_USER + "_REJECTED":
        return {
          ...state,
          loading: false,
          errorMessage: "axios request failed",
        };
      case GET_USER + "_FULFILLED":
        return {
          user: payload,
          loading: false,
          errorMessage: "",
        };
      case ADD_TO_CART:
        return {
        ...state, cart: [...state.cart, payload]
        };
      default:
        return state;
    }
  }