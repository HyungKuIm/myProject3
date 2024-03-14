import express from "express";
import path from "path";
import Member from "../schemas/member.js";

const router = express.Router();

//로그인
router.route("/")
    .get((req, res) => {
        res.render("login/login");
    })
    .post(async (req, res, next) => {
        console.log(req.body.userId);

        // if (req.body.userId) {
        //     req.session.user = {name: req.body.userId};
        //     res.redirect('/admin/');
        // } else {
        //     const err = '로그인이 실패했습니다. 다시 입력해 주십시오';
        //     res.render('login/login', {error: err});
        // }
        if (req.body.userId) {
            try {
                const member = await Member.findOne({userId:req.body.userId});
                if (!member) {
                    const err = '그런 아이디는 없습니다. 다시 입력해 주십시오';
                    res.render('login/login', {error: err});
                } else {
                    // 비번 체크
                    if (member.password === req.body.password) {
                        req.session.user = {name: req.body.userId};
                        res.redirect('/admin/');
                    } else {
                        const err = '비번이 틀렸습니다. 다시 입력해 주십시오';
                        res.render('login/login', {error: err});
                    }
                }
            } catch (err) {
                console.error(err);
                next(err);
            }
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