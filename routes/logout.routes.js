import express from "express";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), path: "/" });
  res.status(200).send("Logged out");
});

export default router;
