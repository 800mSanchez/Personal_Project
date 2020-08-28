#### MVP

- The ability to search for a product
- The ability to add,edit,delete product to a cart.
- The ability to choose the state to “shop local”.
- There will be a login/register page to access more of the website.


#### Database
- Schemas: 

users
```SQL
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(60),
    password TEXT
)
```

```SQL
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title TEXT,
    price INT,
    location VARCHAR(60),
    description TEXT,
    image TEXT
    user_id INT REFERENCES users(user_id)
)
```
```SQL
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
)
```

```SQL
CREATE TABLE cartItems (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(cart_id),
    product_id INT REFERENCES products(product_id),
    quantity INT
)
```

#### Server



#### Front-end