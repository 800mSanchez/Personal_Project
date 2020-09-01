CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(60),
    password TEXT
)


CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title TEXT,
    price INT,
    location VARCHAR(60),
    description TEXT,
    image TEXT,
    user_id INT REFERENCES users(user_id)
)


CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
)


CREATE TABLE cartItems (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(cart_id),
    product_id INT REFERENCES products(product_id),
    quantity INT
)




            DROP TABLE IF EXISTS cartitems;

            DROP TABLE IF EXISTS cart;

            DROP TABLE IF EXISTS products;

            DROP TABLE IF EXISTS users;

            CREATE TABLE users (
                user_id SERIAL PRIMARY KEY,
                email VARCHAR(60),
                password TEXT
            );

            CREATE TABLE products (
                product_id SERIAL PRIMARY KEY,
                title TEXT,
                price INT,
                location VARCHAR(60),
                description TEXT,
                image TEXT
            );

            CREATE TABLE cart (
                cart_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id)
            );


            CREATE TABLE cartItems (
                cart_item_id SERIAL PRIMARY KEY,
                cart_id INT REFERENCES cart(cart_id),
                product_id INT REFERENCES products(product_id),
                quantity INT
            );

            INSERT INTO products (title, price, location, description, image)
            VALUES ('kitchen chair', 125, 'Plano, Texas', 'Beautiful handcrafted kitchen chairs made from cherry oak', 'https://images-na.ssl-images-amazon.com/images/I/712MexCjtFL._AC_SL1500_.jpg');

            SELECT * FROM products;