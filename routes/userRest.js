import express from 'express';
import path from 'path';
import User from "../schemas/user.js";

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.find({});
            const data = {content: users};
            res.json(data);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

export default router;