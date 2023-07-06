const jwt = require("jsonwebtoken");
const { getFromRedis } = require("../utils/redis");
const db = require("../.././database/models");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  if (token) {
    jwt.verify(token, "secret", async (error, user) => {
      console.log("user", user);
      if (error) {
        res.status(403).json("Forbidden");
      } else {
        const userId = await getFromRedis(token);

        if (userId) {
          //   // req.user = user;
          //   const getuser = await db.Users.findOne({
          //     where: {
          //       name: user,
          //     },
          //   });
          //   req.user = getuser;
          req.userId = userId;
          next();
        } else {
          res.status(401).json("Unauthorized");
        }
      }
    });
  } else {
    res.status(401).json("Unauthorized");
  }
};

const authAdmin = async (req, res, next) => {
  const userId = req.userId;

  const user = await db.Users.findOne({
    where: {
      id: userId,
    },
  });

  if (user && user.dataValues.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json("Sorry you dont have access to this route!! Please login as admin");
  }
};

module.exports = { authUser, authAdmin };
