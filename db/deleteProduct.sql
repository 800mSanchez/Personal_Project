DELETE FROM cartItems WHERE cart_item_id = $1;

/* SELECT products.title, products.price, cartItems.quantity FROM cartItems JOIN products ON products.product_id = cartItems.product_id
WHERE cartItems.cart_id = $1; */