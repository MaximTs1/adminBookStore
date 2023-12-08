const jwt = require("jsonwebtoken");
const JWT_SECRET = "FullStackW050323MyTokenMagnivMeod";

const getUserId = (req, res) => {
  if (!req.headers.authorization) {
    return null;
  }

  const data = jwt.decode(req.headers.authorization, JWT_SECRET);

  if (!data) {
    return res.status(401).send("User is not authorized");
  }

  return data.id;
};

exports.JWT_SECRET = JWT_SECRET;
exports.getUserId = getUserId;
