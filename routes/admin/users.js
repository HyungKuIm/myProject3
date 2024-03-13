import express from "express";
import path from "path";
import User from "../../schemas/user.js";

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
            res.redirect('/admin/users');
        } catch (err) {
            console.error(err);
            next(err);
        }


    });


router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send('<h1>사용자를 찾을 수 없습니다</h1>');
        }
        const data = {content: user};
        res.render("users/show", data);


    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/edit/:id')
    .get(async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.send('<h1>사용자를 찾을 수 없습니다</h1>');
            }
            const data = {content: user};
            res.render("users/edit", data);


        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
       try {
           await User.updateOne({
               _id: req.params.id,
           }, {
               name: req.body.name,
               age: req.body.age,
           });
           res.redirect('/admin/users');
       } catch (err) {
           console.error(err);
           next(err);
       }
    });

router.post('/delete', async (req, res, next) => {
   try {
       console.log(req.body.id);
       await User.deleteOne({_id: req.body.id});
       res.redirect('/admin/users');
   } catch (err) {
       console.error(err);
       next(err);
   }
});


export default router;