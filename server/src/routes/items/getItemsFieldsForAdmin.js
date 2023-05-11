const router = require("express").Router();
const { Item } = require("../../../db/models");

router.get("/", async (req, res) => {
  try {
    const getFields = await Item.findByPk(1, { raw: true });
    res.json(getFields);
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
