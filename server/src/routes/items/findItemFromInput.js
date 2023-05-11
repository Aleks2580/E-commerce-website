const router = require("express").Router();
const { Op } = require("sequelize");
const { Item, WishList } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { value, check } = req.body;
  try {
    const findItems = await Item.findAll({
      where: {
        title: {
          [Op.substring]: value,
        },
        ...check,
      },
      raw: true,
      offset: 0,
      limit: 10,
    });

    const findItemsLength = await Item.findAll({
      where: {
        title: {
          [Op.substring]: value,
        },
        ...check,
      },
      raw: true,
    });
    res.json({ findItems, length: findItemsLength.length });
  } catch (error) {
    res.send(`${error}`);
  }
});

module.exports = router;
