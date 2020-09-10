const bcrypt = require('bcryptjs');

module.exports = {    

        getProducts: (req, res) => {
            const db = req.app.get("db");
            db.getProducts().then((inventory) => {
                res.status(200).send(inventory)
            }).catch( err => console.log(err));
        },
        addProduct: (req, res) => {
            const {title, price, location, description/* , image */} = req.body
            const db = req.app.get("db");
            db.addProduct([title, price, location, description/* , image */]).then(inventory => {
                res.status(200).send(inventory)
            }).catch( err => console.log(err));
        }
    }