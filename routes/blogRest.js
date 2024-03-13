import express from 'express';
import path from 'path';
import template from '../template.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from "fs";
import Blog from "../schemas/blog.js";

const router = express.Router();

const __dirname = path.resolve();

const tmpDir = path.join(__dirname, 'tmp');
//const pubDir = path.join(__dirname, 'static');
const uploader = multer({dest:tmpDir});

//블로그 목록(Ajax)
router.route("/")
    .get(async (req, res, next) => {
        try {
            // select * from Blog order by createdAt desc
            //const blogs =
                await Blog.find({}).sort({"createdAt": -1}).exec().then((list) => {
                    //console.log(list);
                    //data:image/<%=blog.thumbnailImg.contentType%>;base64,<%=blog.thumbnailImg.data.toString('base64')%>
                    list.map(item => {
                        item.thumbnailImgBase64String = `data:image/${item.thumbnailImg.contentType};base64,${item.thumbnailImg.data.toString('base64')}`;
                        item.thumbnailImg = '';
                        return item;
                    });

                    const data = {content: list};
                    res.json(data);
                });





        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 블로그 상세(Ajax)
router.get("/:id", async (req, res, next) => {
    try {
        //const blog =
        await Blog.findById(req.params.id).exec().then((item) => {
            item.thumbnailImgBase64String = `data:image/${item.thumbnailImg.contentType};base64,${item.thumbnailImg.data.toString('base64')}`;
            item.thumbnailImg = '';

            const data = {content: item};
            res.json(data);
        });
        // if (!blog) {
        //     return res.json('blog를 찾을 수 없습니다.');
        // }
        // const data = {content: blog};
        // res.json(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


export default router;