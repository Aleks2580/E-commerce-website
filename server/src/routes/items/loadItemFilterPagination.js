const router = require("express").Router();
const { Item, WishList } = require("../../../db/models");
const { Op } = require("sequelize");
router.post("/", async (req, res) => {
  const numItems = 10;
  const { page, value, check } = req.body;
  const check2 = check.check;
  const nextitems = page * numItems - numItems;
  const likedItems = await Item.findAll({
    where: {
      title: {
        [Op.substring]: value,
      },
      ...check2,
    },
    raw: true,
    offset: nextitems,
    limit: numItems,
  });
  const itemsNum = await Item.findAll({
    where: {
      title: {
        [Op.substring]: value,
      },
      ...check2,
    },
    raw: true,
  });
  if (req.session.newUserId) {
    const likes = await WishList.findAll({
      where: { user_id: req.session.newUserId },
      raw: true,
    });
    const items = likedItems.map((item) => {
      likes.forEach((like) => {
        if (like.item_id === item.id) {
          item.liked = true;
        }
      });
      return item;
    });

    res.json({ items, length: itemsNum.length });
  } else {
    const items = likedItems;
    res.json({ items, length: itemsNum.length });
  }
});
module.exports = router;
