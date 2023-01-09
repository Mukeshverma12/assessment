import { Response, Request, NextFunction } from "express";
import session from 'express-session'
import userModel from "../models/users";
import { JsonWebTokenError } from "jsonwebtoken";

declare module 'express-session' {
  interface SessionData {
    user: any;
  }
}


const userDetails = async (req: Request, res: Response) => {
  const header = req.session.user;


  const data = await userModel.find();

  res.render('dashboard', { data: data, user: header })

}


const createUser = async (req: Request, res: Response) => {
  let saveUser = new userModel({
    Name: "student2",
    Role: "student",
    email: "student2@gmail.com",
    password: "student@2",
    isStudent: "student",
    timing: ['1 pm - 2 pm', '4 pm - 5 pm', '6 pm to 7']
  })
  saveUser = await saveUser.save();
  console.log(saveUser);

}

const userlogin = async (req: Request, res: Response) => {

  let userdetail = await userModel.findOne({ email: req.body.email, password: req.body.password })

  if (!userdetail) {
    return res.redirect('error')
  }

  req.session.user = userdetail;

  res.status(200).redirect('/')


}

const selectSlot = async (req: Request, res: Response) => {
  const header = req.session.user;


  let date_time = new Date();


  let date = (date_time.getDate() - 7);
  let newdate = "0" + date
  let year = date_time.getFullYear();
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let exactdate = year + "-" + month + "-" + newdate
  console.log(exactdate);

  if (exactdate <= req.body.date) {

    res.send("you should book slot before 7 day")
  }
  else {
    const savedata = await userModel.findByIdAndUpdate({ _id: header._id }, {
      $set: {
        date: req.body.date,
        timeSlot: req.body.time,
        allowslot: "0"
      }

    }, { new: true })




    res.send("slot is booked for you wait for alumni response" + savedata)
  }

}



function restrict(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

const slotApproval = async (req: Request, res: Response) => {
  console.log(req.body);

  const data = await userModel.findByIdAndUpdate({ _id: req.body.id }, {
    $set: {
      allowslot: req.body.timeSlot
    }

  }, { new: true })
    .then((result: any) => {
      res.send("approved the slot")

    })
    .catch((err: any) => {
      console.log(err);

    })



}


export {
  userDetails,
  createUser,
  userlogin,
  selectSlot,
  slotApproval
}