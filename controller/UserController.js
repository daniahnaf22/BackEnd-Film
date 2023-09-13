import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Tidak berhasil mengambil data users" });
  }
};

export const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak cocok" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ msg: "Registrasi berhasil dijalankan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Tidak berhasil register" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ msg: "Password yang diinputkan salah" });
    }

    const { id, name } = user;

    const accessToken = jwt.sign(
      { userId: id, name, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = jwt.sign(
      { userId: id, name, email },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    await User.update({ refresh_token: refreshToken }, { where: { id } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Tidak berhasil login" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(204);
  }
  try {
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      return res.sendStatus(204);
    }

    await User.update(
      { refresh_token: null },
      { where: { refresh_token: refreshToken } }
    );

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Tidak berhasil logout" });
  }
};
