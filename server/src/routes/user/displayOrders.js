const router = require("express").Router();
const { Item, Order } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { user_id } = req.body;
  try {
    const orders = await Order.findAll({
      where: { user_id },
      raw: true,
      include: Item,
    });
    res.json({ orders });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
