module.exports = {

    addToCart: (req,res) => {
        const {product_id, quantity} = req.body
        const {cart_id} = req.session.user
        console.log(req.session)
        const db = req.app.get("db");
        db.addToCart([cart_id, product_id, quantity]).then(inventory => {
            res.status(200).send(inventory)
        }).catch( err => console.log(err));
    },

    deleteProduct: (req, res) => {
        const { product_id } = req.params
        const db = req.app.get("db");
        db.deleteProduct([product_id]).then(() => {
            res.sendStatus(200);
        }).catch( err => console.log(err))
    },

    /* editProduct: (req, res) => {
        const { product_id } = req.params
        const db = req.app.get("db");
        db.editProduct
    } */
}