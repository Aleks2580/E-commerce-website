const router = require("express").Router();
const { Item, WishList } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { user_id } = req.body;
  try {
    const wishList = await WishList.findAll({
      where: { user_id },
      raw: true,
      include: Item,
    });
    const likedItems = wishList.forEach((element) => {
      element.liked = true;
    });
    res.json({ wishList });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
