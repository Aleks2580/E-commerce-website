const router = require("express").Router();
const { Item } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { item_id } = req.body;
  const el = await Item.findOne({ where: { id: item_id }, raw: true });
  res.json(el);
});

module.exports = router;
