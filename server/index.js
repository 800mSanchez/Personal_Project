require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
const ctrl = require('./Controllers/loginController');
const storeCtrl = require('./Controllers/storeController');
const cartCtrl = require('./Controllers/cartController');

app.use(express.json());
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

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.get('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)

app.get('/store/inventory', storeCtrl.getProducts);
app.post('/store/product', storeCtrl.addProduct);

app.post('/cart/product', cartCtrl.addToCart)
app.delete(`/cart/product/:product_id`, cartCtrl.deleteProduct);
/* app.put(`/cart/product/:id`, controller.editProduct); */

app.listen(SERVER_PORT, ()=> console.log(`Connected to port ${SERVER_PORT}`));