# E-Commerce React App

This is a full-stack e-commerce website built with React, TailwindCSS, Node.js, Express, and MongoDB.

The website lets users browse products, view product details, register, log in, add products to the cart, update cart quantities, remove cart items, save favorite products, and continue to a shipping summary page.

## Main Features

- User registration and login
- Product listing page
- Product search by name
- Product filtering by category
- Product details page
- Add to cart
- Update product quantity in the cart
- Remove products from the cart
- Favorite products using browser local storage
- Shipping summary page
- Responsive UI with TailwindCSS
- Backend API using Express and MongoDB

## Project Structure

```text
ecommerce-react-app/
  client/   React frontend
  server/   Express backend and MongoDB models
```

## Frontend

The frontend is built with React and Vite.

Important frontend folders:

```text
client/src/API/          API request functions
client/src/components/   Shared React components
client/src/pages/        Website pages
client/src/Layout/       Main routing layout
```

Main pages:

- Home
- Login
- Register
- Products
- Product Details
- Favorite Products
- Cart
- Shipping

## Backend

The backend is built with Node.js, Express, and MongoDB.

Important backend folders:

```text
server/controllers/   Request handling logic
server/routes/        API routes
server/models/        MongoDB schemas
server/middlewares/   Error middleware
server/utils/         Validation helpers
```

Main API routes:

```text
POST   /api/auth/signup
POST   /api/auth/login

GET    /api/products
GET    /api/products/:id
POST   /api/products/add
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/cart
POST   /api/cart/add
PUT    /api/cart
DELETE /api/cart/:productId

POST   /api/users/toggle-favorite
GET    /api/users/my-favorites
```

## How the Website Works

1. The user opens the React website.
2. The products page requests product data from the backend.
3. The backend reads products from MongoDB and returns them to the frontend.
4. The user can search products or filter them by category.
5. The user can open a product details page.
6. If logged in, the user can add products to the cart.
7. The cart page loads the user cart from the backend using the saved JWT token.
8. The user can update quantities or remove items.
9. The shipping page shows the order status and a final order summary.

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Optional frontend environment variable:

```env
VITE_API_URL=http://localhost:5000
```

If `VITE_API_URL` is not provided, the frontend uses `http://localhost:5000` for axios API files and Vite proxy for `/api` fetch requests during development.

## How to Run the Project

Install backend dependencies:

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

Install frontend dependencies:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Default local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

## Build Frontend

```bash
cd client
npm run build
```

## Notes

- The backend must be running before using login, register, cart, or product API features.
- MongoDB must be connected with a valid `MONGO_URI`.
- Protected cart and user routes require a valid JWT token from login or registration.
- Favorite products are stored in browser local storage.
