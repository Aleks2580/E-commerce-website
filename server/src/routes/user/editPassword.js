const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../../db/models");

router.put("/", async (req, res) => {
  const { password } = req.body;
  const { newUserId } = req.session;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.update({ password: hash }, { where: { id: newUserId } });
    res.json({ update: "ok" });
  } catch (error) {
    res.send(`${error}`);
  }
});

module.exports = router;
