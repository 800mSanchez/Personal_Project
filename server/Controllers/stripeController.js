
module.exports = {

    Stripe: async (req,res) => {
        const { items } = req.body;
            /* const calculateOrderAmount = items => {
                return 1400;
              }; */
        const paymentIntent = await Stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd"
        });
        res.send({
            clientSecret: paymentIntent.client_secret
          });
    }
}