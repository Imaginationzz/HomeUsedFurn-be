const jwt = require("jsonwebtoken");

const authenticate = async (user) => {
  try {
    accessToken = await generateJWT({ _id: user._id });
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const generateJWT = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  );

const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  );

module.exports = { authenticate ,verifyJWT};
