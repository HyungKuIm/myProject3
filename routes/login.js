import express from "express";
import path from "path";
import User from "../schemas/user.js";

const router = express.Router();

//로그인
router.route("/")
    .get((req, res) => {
        res.render("login/login");
    })
    .post((req, res, next) => {
        console.log(req.body.userId);
        if (req.body.userId) {
            req.session.user = {name: req.body.userId};
            res.redirect('/admin/');
        } else {
            const err = '로그인이 실패했습니다. 다시 입력해 주십시오';
            res.render('login/login', {error: err});
        }
    });

// 로그아웃
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

export default router;