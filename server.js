import express from 'express';
import path from 'path';
import template from './template.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import * as fs from "fs";


mongoose.connect('mongodb://127.0.0.1/myProject');
const db = mongoose.connection;

db.once('open', () => console.log('DB connection successful'));

const __dirname = path.resolve();   // 현재 디렉토리 경로 ex)D:\NodeProject\MyProject\

const app = express();
const port = "7080";   // 개발포트 8080
const tmpDir = path.join(__dirname, 'tmp');
const pubDir = path.join(__dirname, 'static');
const uploader = multer({dest:tmpDir});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res) {
    res.send(template());
});

//메모 송신
app.get('/memo', function(req, res) {
    res.send(`
        <form method="post">
            <textarea name="memo">메모 입력</textarea>
            <br/> <input type="submit" value="송신" />
        </form>
    `);
});

app.post('/memo', function(req, res) {
    const content = req.body;
    console.log(content);
    res.send('송신되었습니다...메모 내용:' + content.memo);
});

//파일 업로드
app.get('/upload', function(req, res) {
    res.send(`
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="aFile" /> <br/>
            <input type="submit" value="업로드" />
        </form>
    `);
});

app.post('/upload', uploader.single('aFile'), function(req, res) {
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

app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Server started 2222 on port %s', port);
});
