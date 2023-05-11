const router = require("express").Router();
const { User } = require("../../../db/models");

router.put("/", async (req, res) => {
  const { email } = req.body;
  const { newUserId, newUser } = req.session;
  try {
    await User.update({ email }, { where: { id: newUserId } });
    req.session.newUserEmail = email;
    res.json({ login: newUser, id: newUserId, email: email });
  } catch (error) {
    res.send(`${error}`);
  }
});

module.exports = router;
