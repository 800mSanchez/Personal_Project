require('dotenv').config();
const express = require('express');
/* cors = require("cors"); */
/* const aws = require("aws-sdk"); */
const session = require('express-session');
const massive = require('massive');
const app = express();

const { resolve } = require('path')
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
const ctrl = require('./Controllers/loginController');
const storeCtrl = require('./Controllers/storeController');
const cartCtrl = require('./Controllers/cartController');
const bucketCtrl = require('./Controllers/bucketController');
const stripeCtrl = require('./Controllers/stripeController');
/* const { default: Stripe } = require('stripe'); */

/* app.use(cors()); */
app.use(express.static("."));
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 72},
    secret: SESSION_SECRET
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then( db => {
        app.set('db', db)
        console.log('connected to db')
    }).catch( err => console.log(err))

app.post("/create-payment-intent", stripeCtrl.Stripe);   

app.get('/store/images', bucketCtrl.getImages);    

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.get('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)

app.get('/store/inventory', storeCtrl.getProducts);
app.post('/store/product', storeCtrl.addProduct);

app.get('/cart/inventory', cartCtrl.getCart);
app.post('/cart/product', cartCtrl.addToCart);
app.delete(`/cart/product/:cart_item_id`, cartCtrl.deleteProduct);
app.put(`/cart/product/:id`, cartCtrl.editQuantity);

app.listen(SERVER_PORT, ()=> console.log(`Connected to port ${SERVER_PORT}`));