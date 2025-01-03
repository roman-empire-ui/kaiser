import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genTokenAndCookie from "../utils/genToken.js";
export const signUp = async (req, res) => {
  try {
    const { fullName, userName, password, gender, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match." });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profile: gender === "male" ? maleProfile : femaleProfile,
    });

    if (newUser) {
        genTokenAndCookie(newUser._id , res)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profile: newUser.profile,
      });
    } else {
        res.status(401).json({error : 'Invalid user data'})
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const {userName , password} = req.body 
    const user = await User.findOne({userName}) 
    const isPassword = await bcrypt.compare(password,user?.password || '')

    if(!user || !isPassword){
        return res.status(401).json({error : 'Invalid credentials'})
    }

    genTokenAndCookie(user._id , res) 
    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profile: user.profile,
        message : 'Logged in successfully'
    })

  } catch (e) {
    console.log(e) 
    res.status(500).json({
        error: "Internal server error",
    })
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie('token' , '' ,{maxAge : 0})
    res.status(200).json({message : 'Logged out successfully'})
  } catch (e) {
    console.log(e)
    res.status(500).json({error : 'Internal server error'})
  }
};
