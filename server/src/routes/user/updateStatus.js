const router = require("express").Router();
const { User } = require("../../../db/models");

router.post("/", async (req, res) => {
  const { newStatus, email } = req.body;
  try {
    await User.update({ status: newStatus }, { where: { email } });
    res.json({ newStatus, result: "success" });
  } catch (error) {
    res.send(`${error}`);
    res.json({ result: "success" });
  }
});

module.exports = router;
