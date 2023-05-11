const router = require("express").Router();
const { Cart, Order } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { user_id } = req.body;
  try {
    const cartCurrent = await Cart.findAll({ where: { user_id }, raw: true });
    cartCurrent.forEach(async (element) => {
      await Order.create({ user_id, item_id: element.item_id });
    });
    await Cart.destroy({ where: { user_id } });
    const cart = await Cart.findAll({ where: { user_id }, raw: true });
    res.json({ cart });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
