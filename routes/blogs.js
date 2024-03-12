import express from "express";
import template from "../template.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import Blog from "../schemas/blog.js";

const router = express.Router();

const __dirname = path.resolve();

const tmpDir = path.join(__dirname, 'tmp');
const pubDir = path.join(__dirname, 'static');
const uploader = multer({dest:tmpDir});
router.route("/")
    .get(async (req, res, next) => {
        try {
            const blogs = await Blog.find({});
            const data = {content: blogs};
            res.render("blogs/list", data);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/add')
    .get((req, res) => {
        res.render('blogs/add');
    })
    .post(uploader.single('thumbnailImg'), async (req, res, next) => {
       try {
           //파일형식 체크
           if (req.file.mimetype !== "image/jpg" &&
               req.file.mimetype !== "image/jpeg" &&
               req.file.mimetype !== "image/png" &&
               req.file.mimetype !== "image/gif") {
               res.send("이미지(jpg, png, gif) 파일만 업로드 가능합니다.");
               return;
           }

           const obj = {
               subject: req.body.subject,
               blogBody: req.body.blogBody,
               thumbnailImg: {
                   data: fs.readFileSync(path.join(__dirname + '/tmp/' + req.file.filename)),
                   contentType: req.file.mimetype
               }

           };
           await Blog.create(obj);
           res.redirect('/admin/blogs');
       } catch (err) {
           console.error(err);
           next(err);
       }
    });

export default router;