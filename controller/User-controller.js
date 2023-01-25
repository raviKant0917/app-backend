import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { User } from "../models/Users.js";

export const getUsers = async(req,res)=>{
    try {
        const result = await User.find()
        console.log(result);
        res.status(200).json({
            success: "true",
            body: result
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

export const postUsers = async(req,res)=>{
    console.log(req.body);
    const {
        fullName,
        userName,
        email,
        password,
        phoneNumber,
        instaId,
        profileImage
    } = req.body;
    try {
        const result = await User.findOne({email: email});
        if(result){
            return res.status(401).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        console.log(hashedPassword);
        const newUser = await User.create({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            instaId: instaId,
            profileImage: profileImage,
            phoneNumber: phoneNumber
        })
        console.log(newUser);
        res.status(201).json({
            success: true,
            body: newUser
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Something went wrong!"})        
    }    
}
