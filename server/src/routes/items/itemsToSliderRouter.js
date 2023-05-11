const router = require("express").Router();
const { Item } = require("../../../db/models");

router.get("/", async (req, res) => {
  const items = await Item.findAll({ where: { category_id: 13 }, raw: true });
  res.json(items);
});

module.exports = router;
