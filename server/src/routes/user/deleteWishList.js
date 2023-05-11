const router = require("express").Router();
const { WishList } = require("../../../db/models");

router.delete("/", async (req, res) => {
  const { user_id, item_id } = req.body;
  try {
    await WishList.destroy({ where: { user_id, item_id } });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
