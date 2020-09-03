INSERT INTO cartItems (cart_id, product_id, quantity)
VALUES
($1, $2, $3);

SELECT * FROM cartItems;