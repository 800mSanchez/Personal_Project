import axios from 'axios';

const initialState = {
    inventory: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

export function getProducts(){
    const inventory = axios.get('/store/inventory')
    return {
        type: GET_PRODUCTS,
        payload: inventory
    }
}

export function addProduct(){
    return {
        type: ADD_PRODUCT,
        payload: inventory
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return  {...state, inventory: action.payload}
        case ADD_PRODUCT:
            return {...state, }
    }
}