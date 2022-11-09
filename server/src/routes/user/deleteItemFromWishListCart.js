const router = require('express').Router();
const { User, Item, Cart, WishList } = require('../../../db/models');

router.post('/', async (req, res) => {
  const {user_id, item_id} = req.body
  try {
    await Cart.create ({user_id, item_id})
    const cart = await Cart.findAll({  where: {user_id} , raw: true})
    res.json({cart})
  } catch (error) {
    res.send(`Error while loading items! ${error}`)
  }
  
})

module.exports = router;