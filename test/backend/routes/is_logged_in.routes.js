import express from 'express';
import protectRoute from './protectRoute.js';

const router = express.Router();

router.get('/check', protectRoute, async (req, res) => {
    // const {message} = req.body;
    // const { id : recieverId } = req.param;
    // const senderId = req.user._id;
    try {
        if (Object.keys(req.user).length > 0) {
            res.json(req.user);
        } else {
            console.log({ message: 'Ooops token expired ' }, '---------------');
            res.json({ message: 'Ooops token expired ' });
        }
    } catch (error) {
        console.log('Error in message.Routes.js');
        res.status(500).json({ error: 'internal server error' });
    }
})

export default router;

