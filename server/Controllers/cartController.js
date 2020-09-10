module.exports = {

    getCart: (req, res) => {
        const db = req.app.get("db");
        const {cartId} = req.session.user
        console.log(req.session)
        db.get_cart(cartId).then((inventory) => {
            res.status(200).send(inventory)
        }).catch( err => console.log(err));
    },

    addToCart: (req,res) => {
        const {product_id, quantity} = req.body
        const {cartId} = req.session.user
        console.log(req.session)
        const db = req.app.get("db");
        db.addToCart([cartId, product_id, quantity]).then(inventory => {
            res.status(200).send(inventory)
        }).catch( err => console.log(err));
    },

    deleteProduct: (req, res) => {
        const { cart_item_id } = req.params
        console.log(cart_item_id)
        const db = req.app.get("db");
        db.deleteProduct([cart_item_id]).then(() => {
            res.sendStatus(200);
        }).catch( err => console.log(err))
    },

    editQuantity: (req, res) => {
        const { id } = req.params;
        const {cartId} = req.session.user
        const { quantity } = req.body
        const db = req.app.get("db");
        db.editQuantity([id, quantity, cartId]).then((cart) => {
            res.status(200).send(cart);
        });
    }
}