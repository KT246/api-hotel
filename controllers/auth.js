const auth = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. check username exists
    const checkUsername = await auth.find({ username: username }).exec();
    if (checkUsername.length > 0) {
      return res.status(400).json({ message: "username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const data = await auth({
      username: username,
      password: hashPassword,
    }).save();
    res.send({ message: "Đăng ký thành công!", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log({ email, password });
    console.log(username, password);

    // 1. check emil
    const admin = await auth.find({ username: username }).exec();
    // console.log(admin);
    if (!admin) {
      return res.status(400).send({ message: "username không đúng!" });
    }
    // 2. check password
    const isMatch = await bcrypt.compare(password, admin[0].password);
    if (!isMatch) {
      return res.status(400).send({ message: "Password không đúng!" });
    }
    //3. playload
    const playload = {
      id: admin[0]._id,
      username: admin[0].username,
      role: admin[0].role,
    };
    // 4. generate token
    jwt.sign(
      playload,
      process.env.SECRET_JWT,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Sever error jwt", error: err });
        }

        res.json({ playload, token });
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};
