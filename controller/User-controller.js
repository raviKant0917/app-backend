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

export const getUsersByName = async(req,res)=>{
    try {
        const key = req.params.name;
        // const regex = new RegExp(key,g);
        console.log(key);
        const result = await User.find({
            $or: [{'userName': key},{'phoneNumber': key}]
        });
        console.log(result);
        res.status(201).json({
            message: "found",
            body: result
        })       
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

// export const getUserById = async(req,res)=>{
//     const id = req.params.id;
//     try {
//         const result = await User.findById(id);
//         if(!result){
//             return res.status(401).json({
//                 message: "User does not exist exists"
//             })
//         }
//         console.log(result);
//         res.status(200).json({
//             success: "true",
//             body: result
//         })
//     } catch (e) {
//         res.status(500).json({
//             message: "Something went wrong!"
//         })
//     }
// }

export const postUsers = async(req,res)=>{
    console.log(req.body);
    const {
        firebaseId,
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
            firebaseId: firebaseId,
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

export const patchUser = async(req,res)=>{
    const id = req.params.id;
    const details = req.body;
    try {
        const userFound = await User.findByIdAndUpdate(id,details,{new: true});
        if(!userFound){
            return res.status(400).json({message: "User not found"})
        }
        res.status(201).json({
            modified:"true",
            body: userFound
        })
    } catch (e) {
        res.status(500).json({message: "Something went wrong!"})
    }
    const userFound = await User.findByIdAndUpdate(id,details);
    
}

export const deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({message: "User not found"})
        }
        res.status(200).json({
            success: "true",
            deleted: result
        })
    } catch (e) {
        res.status(401).json({
            message: "Somthing went wrong"
        })
    }
}