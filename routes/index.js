import express from "express";
import template from "../template.js";
import fs from "fs";
import path from "path";
import multer from "multer";
const router = express.Router();

const __dirname = path.resolve();

const tmpDir = path.join(__dirname, 'tmp');
const pubDir = path.join(__dirname, 'static');
const uploader = multer({dest:tmpDir});

router.get('/', function(req, res) {
    res.send(template());
});

router.get('/memo', function(req, res) {
    res.send(`
        <form method="post">
            <textarea name="memo">메모 입력</textarea>
            <br/> <input type="submit" value="송신" />
        </form>
    `);
});

router.post('/memo', function(req, res) {
    const content = req.body;
    console.log(content);
    res.send('송신되었습니다...메모 내용:' + content.memo);
});

router.get('/upload', function(req, res) {
    res.send(`
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="aFile" /> <br/>
            <input type="submit" value="업로드" />
        </form>
    `);
});

router.post('/upload', uploader.single('aFile'), function(req, res) {
    //파일형식 체크
    if (req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/gif") {
        res.send("이미지(jpg, png, gif) 파일만 업로드 가능합니다.");
        return;
    }
    //이미지 파일(jpg, png, gif)
    const des = pubDir + "/" + req.file.originalname;
    //const fs = require("fs");
    fs.rename(req.file.path, des, () => {
        // html출력
        res.send(`파일을 업로드하였습니다.<br/>
              <img src="/static/${req.file.originalname}" />
    `   );
    });




});

export default router;