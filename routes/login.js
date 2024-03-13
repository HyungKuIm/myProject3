import express from "express";
import path from "path";
import User from "../schemas/user.js";

const router = express.Router();

router.route("/")
    .get((req, res) => {
        res.render("login/login");
    });

export default router;