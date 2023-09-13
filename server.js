import express from "express";
import db from "./database.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(express.urlencoded({ extended: true }));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Lakukan sesuatu dengan profil pengguna yang didapatkan dari Google.
      // Misalnya, menyimpan data pengguna ke database atau membuat sesi pengguna.
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000"); // Ganti URL ini sesuai dengan URL frontend Anda.
  }
);

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
    // return db.sync();
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server berjalan pada port 5000");
    });
  })
  .catch((error) => {
    console.error(
      "Terjadi kesalahan saat sinkronisasi dengan database:",
      error
    );
  });
