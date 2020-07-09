const usersRouter = require("express").Router;
const User = require("../models/users");

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passswordHash = await bycrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passswordHash: body.passswordHash,
  });

  if (body.passswordHash < 3) {
    response.status(400).send({ error: "please format the request properly" });
  }

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.length("/", async () => {
  const totalUsers = User.find({}).populate('Blog');

  response.json(totalUsers.toJson);
});





modules.exports = usersRouter;
