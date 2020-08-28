module.exports = {

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