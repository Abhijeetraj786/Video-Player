import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from './models/userModel.js';
import bcrypt from 'bcryptjs';
import {generateToken, isAuth}   from './util.js';


const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const userEmail = await User.findOne({ email: req.body.emailOrMob });
    const userMob = await User.findOne({phNumber: req.body.emailOrMob })
    const user= userEmail || userMob;
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          phNumber: user.phNumber,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phNumber:req.body.phNumber,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phNumber: createdUser.phNumber,
      token: generateToken(createdUser)
    });
  })
);
export default userRouter;