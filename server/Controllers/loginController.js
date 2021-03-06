const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const existingUser = await db.check_user(email);
        if(existingUser[0]){
            return res.status(409).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.create_user([email, hash])
        const [cart_id] = await db.create_cart(newUser.user_id)
        if(!newUser.cart_id){
            newUser.cart_id = cart_id.cart_id
        }
        req.session.user = {
            userId: newUser.user_id,
            email: newUser.email,
            cartId: newUser.cart_id
        }
        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const user = await db.check_user(email);
        if(!user[0]){
            return res.status(401).send('Incorrect credentials');
        } else {
           const authenticated = bcrypt.compareSync(password, user[0].password);
           if(authenticated){
               const [cart_id] = await db.get_user_cartId(user[0].user_id)
               req.session.user = {
                   userId: user[0].user_id,
                   email: user[0].email,
                   cartId: cart_id.cart_id
               }
               res.status(200).send(req.session.user)
           } else {
               res.status(403).send('Email or password incorrect')
           }
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }    
}