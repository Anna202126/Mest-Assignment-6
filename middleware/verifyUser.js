const jwt = require("jsonwebtoken");

exports.verifyUser = function (req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({ err: "Unauthorized route" });
  }

  let decoded = jwt.verify(token, "My token secret");
  req.user = decoded.id;
  if (!req.user) {
    return res.status(201).json({ err: "Invalid credentials" });
  }

  next();
};
