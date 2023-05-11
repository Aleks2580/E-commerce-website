# E-market
E-market is an e-commerce website that provides a user-friendly platform for buying and selling products online. 

## Tech Stack

### Front-end Stack
- React | Redux
- Ant Design
- CSS
- HTML
- JavaScript

### Back-end Stack
- Node.js
- Express
- PostgreSQL
- Sequelize

## Features
### E-market comes with the following key features:

- User Registration and Login: Users can create an account or log in using their credentials to access personalized features.
- User Cabinet: Users have their own dashboard where they can manage their profile information, view order history, manage wishlists, and update personal preferences.
- Seller Cabinet: Sellers can manage their products and upload products they want to sell. Sellers can create and manage product listings, including details such as title, description, price, and availability.
- Admin Panel: Administrators have access to an admin panel to manage accounts.
- Wishlist: Users can create wishlists to save products for future purchases or to share with others.
- Shopping Cart: Users can add products to their cart, review their selections, and proceed to checkout.

## Screenshot
Main Page Screenshot![readme](https://github.com/TyamackovM/E-market/assets/90598699/7a85e76e-e41c-42ac-a8e1-0ef3ce205ba3)

## Getting Started
To get started with the RMS project locally, follow these steps:

1. Clone the repository.

2. Install the dependencies:
  - Front-end: Open the terminal, navigate to the client folder, and run npm install.
  - Back-end: Open another terminal window, navigate to the server folder, and run npm install.
 
3. Configure the environment variables:
  - Back-end: Create a .env file in the server directory and modify it depending on your specific configuration. Make sure to set the required environment variables according to your setup, such as the database connection details and session secret: 
     - PORT=4000
     - DATABASE_URL=postgres://yourUserName:yourPassword@localhost:5433/yourDataBaseName
     - SESSION_SECRET=yourSessionSecret
     
4. Install and Set Up the Database:
  - Ensure that you have PostgreSQL installed on your system.
  - Open a terminal window and run the following commands:
       - npx sequelize db:create
       - npx sequelize db:migrate
       - npx sequelize db:seed:all
       
5. Start the development servers:
  - Front-end: In the terminal, navigate to the client folder and run npm start.
  - Back-end: In a separate terminal window, navigate to the server folder and run npm run dev.
