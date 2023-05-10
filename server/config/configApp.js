const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');

const regRouter = require('../src/routes/user/regRouter');
const loginRouter = require('../src/routes/user/loginRouter');
const checkUserRouter = require('../src/routes/user/checkUserRouter');
const logoutRouter = require('../src/routes/user/logoutRouter');
// const getItemsRouter = require('../src/routes/items/getItemsRouter');
const editPassword = require('../src/routes/user/editPassword');
const editEmail = require('../src/routes/user/editEmail');
const itemsToSliderRouter = require('../src/routes/items/itemsToSliderRouter');
const findItemFromInput = require('../src/routes/items/findItemFromInput');
const addItemToWishList = require('../src/routes/user/addItemToWishList');
const deleteWishList = require('../src/routes/user/deleteWishList');
const findItemCategoryFilter = require('../src/routes/items/findItemCategoryFilter');
const getItemsFieldsForAdmin = require('../src/routes/items/getItemsFieldsForAdmin');
const displayWishList = require('../src/routes/user/displayWishList');
const loadItemPagination = require('../src/routes/items/loadItempagination');
const loadItemFilterPagination = require('../src/routes/items/loadItemFilterPagination');
const addItemToCart = require('../src/routes/user/addItemToCart');
const displayCart = require('../src/routes/user/displayCart');
const deleteItemFromCart = require('../src/routes/user/deleteItemFromCart');
const deleteItemFromWishListCart = require('../src/routes/user/deleteItemFromWishListCart');
const addNewItem = require('../src/routes/items/addNewItem');
const searchUserByEmail = require('../src/routes/user/searchUserByEmail');
const updateUserStatus = require('../src/routes/user/updateStatus');
const geItemForBottomMainBlock = require('../src/routes/items/geItemForBottomMainBlock');
const createOrder = require('../src/routes/user/createOrder');
const checkOneItem = require('../src/routes/items/checkOneItem');
const addManyItemToCart = require('../src/routes/items/add-many-item-to-cart');
const displayOrders = require('../src/routes/user/displayOrders');

module.exports = function configApp(app) {
  app.use(morgan('dev'));
  app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));

  const { PORT, SESSION_SECRET } = process.env;

  const sessionConfig = {
    name: 'SessionAliElbrus',
    store: new FileStore(),
    secret: SESSION_SECRET ?? 'vasdg34erh35h24g31f23g3gh3hth',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
    },
  };

  app.use(session(sessionConfig));

  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.use('/registr', regRouter);
  app.use('/login', loginRouter);
  app.use('/check', checkUserRouter);
  app.use('/logout', logoutRouter);
  // app.use('/get-items', getItemsRouter);
  app.use('/edit-password', editPassword);
  app.use('/edit-email', editEmail);
  app.use('/find-slider', itemsToSliderRouter);
  app.use('/check-item', findItemFromInput);
  app.use('/add-item-to-wish-list', addItemToWishList);
  app.use('/delete-item-from-wish-list', deleteWishList);
  app.use('/filter-category', findItemCategoryFilter);
  app.use('/get-fields', getItemsFieldsForAdmin);
  app.use('/display-wishlist', displayWishList);
  app.use('/get-next-page', loadItemPagination);
  app.use('/get-next-filter-page', loadItemFilterPagination);
  app.use('/add-item-to-cart', addItemToCart);
  app.use('/delete-item-from-cart', deleteItemFromCart);
  app.use('/delete-item-from-wish-list-cart', deleteItemFromWishListCart);
  app.use('/display-cart', displayCart);
  app.use('/add-new-item', addNewItem);
  app.use('/search-by-email', searchUserByEmail);
  app.use('/update-status', updateUserStatus);
  app.use('/create-order', createOrder);
  app.use('/update-status', updateUserStatus);
  app.use('/check-one-item', checkOneItem);
  app.use('/add-many-item-to-cart', addManyItemToCart);
  app.use('/get-item-main-bottom', geItemForBottomMainBlock);
  app.use('/display-orders', displayOrders);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../../client/build/index.html'));
  });
}
