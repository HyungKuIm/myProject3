import express from "express";
import path from "path";
import User from "../schemas/user.js";

const router = express.Router();

const __dirname = path.resolve();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.find({});
            const data = {content: users};
            res.render("users/list", data);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/add')
    .get((req, res) => {
        res.render('users/add');
    })
    .post(async(req, res, next) => {
        try {
            const name = req.body.name;
            const age = req.body.age;
            await User.create({
                name: name,
                age: age
            });
            res.redirect('/users');
        } catch (err) {
            console.error(err);
            next(err);
        }


    });


export default router;