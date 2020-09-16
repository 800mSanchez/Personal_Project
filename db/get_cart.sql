SELECT products.title, products.price, cartItems.quantity, cartItems.cart_item_id FROM cartItems JOIN products ON products.product_id = cartItems.product_id
WHERE cartItems.cart_id = $1;