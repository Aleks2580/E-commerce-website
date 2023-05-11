const router = require("express").Router();
const { User, Item, Cart } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { user_id, item_id, quantity } = req.body;
  try {
    let i = 0;
    while (i < quantity) {
      await Cart.create({ user_id, item_id });
      i++;
    }

    res.json({ quantity });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
