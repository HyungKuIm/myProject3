import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import indexRouter from './routes/index.js';
import userRouter from './routes/admin/users.js';
import userRestRouter from './routes/userRest.js';
import blogRouter from './routes/admin/blogs.js';
import blogRestRouter from './routes/blogRest.js';
import loginRouter from './routes/login.js';
import homeRouter from './routes/admin/home.js';

import session from "express-session";
import MongoStore from "connect-mongo";


mongoose.connect('mongodb://127.0.0.1/myProject');
const db = mongoose.connection;

db.once('open', () => console.log('DB connection successful'));

const __dirname = path.resolve();   // 현재 디렉토리 경로 ex)D:\NodeProject\MyProject\

const app = express();
const port = "7080";   // 개발포트 8080


app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:true}));

//session
app.use(session({
    secret: 'oraclejava',
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/session'})
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const loginCheck = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin/users', loginCheck, userRouter);
app.use('/admin/', loginCheck, homeRouter);
app.use('/admin/blogs', loginCheck, blogRouter);
app.use('/api/blogs', blogRestRouter);
app.use('/api/users', userRestRouter);


app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Server started 2222 on port %s', port);
});
