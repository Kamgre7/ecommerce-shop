# Ecommerce-shop App

#### 🛠 I am currently working on improving the project. This is not the final version yet, so expect further updates and additional features. 🛠

E-commerce Shop is a web application designed to provide users with a platform for online shopping, offering features such as user authentication, product management, shopping cart functionality, order processing, and more.

### Features

- User authentication
- Shopping cart management:
  - Add items to cart
  - Change item quantity
  - View all products in cart
  - Remove all products from cart
  - Remove single product from cart
- Category management:
  - Add category (admin only)
  - Get all categories
  - Get single category
  - Remove category (admin only)
  - Update category (admin only)
- Product management:
  - Add product (admin only)
  - Update product details (admin only)
  - Get product details
  - Get 5 most sold products
  - Search products by query
  - Remove product (admin only)
  - Rate product
  - Update quantity of product inventory (admin only)
- Order management (utilizing Stripe for payments):
  - Create order with products from cart
  - Get order details
  - Get order history
- User management:
  - Create user
  - Add user residential address
  - Update user information
  - Get user information
  - Get user's residential addresses
  - Remove user

### 🚀 Technologies

- Node.js
- Express.js
- TypeScript
- Zod
- Bcrypt
- Inversify
- PostgreSQL
- Kysely
- Jest
- Docker
- Husky
- JWT
- Swagger
- Prettier + ESLint
- Stripe payments

### ✅ Requirements

Before starting, you need to have Git and Node installed.

### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/ecommerce-shop.git

# Go to the project directory
$ cd ecommerce-shop-app

# Install dependencies
$ npm install

# Initialize database
$ npm run dbInit

# Migrate db
$ npm run migrations

# Start the server
$ npm run start
```
