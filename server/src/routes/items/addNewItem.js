const router = require("express").Router();
const { Item } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { newItem } = req.body;
  try {
    await Item.create(newItem);
  } catch (error) {
    res.send(`${error}`);
  }
  res.end();
});

module.exports = router;
