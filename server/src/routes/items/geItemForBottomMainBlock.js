const router = require("express").Router();
const { Item } = require("../../../db/models");

function getRandomCategory() {
  const categoriesQuantity = 26;
  const getRandomCategory = Math.floor(
    Math.random() * (categoriesQuantity - 1) + 1
  );
  return getRandomCategory;
}

router.get("/", async (req, res) => {
  const quantityOfCards = 24;
  let counter = 0;
  let result = [];
  try {
    while (counter < quantityOfCards) {
      counter++;
      const randomCategory = getRandomCategory();
      const allItemsInCategory = await Item.findAll({
        where: { category_id: randomCategory },
        raw: true,
      });
      const length = allItemsInCategory.length;
      const randomIndexes = Math.floor(Math.random() * (length - 1) + 1);
      const getRandomItems = allItemsInCategory[randomIndexes];
      result.push(getRandomItems);
    }
  } catch (error) {
    res.send(`${error}`);
  }
  res.json(result);
});

module.exports = router;
