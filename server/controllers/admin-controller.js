const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({} , {password:0});
        console.log(users);
        
        if(!users || users.length ===0){
            return res.status(404).json({message :"no data found"});
        }
        res.status(200).json(users);
    } catch (error) {
        
    }
}
const getAllContacts = async (req, res) =>{
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message :"no data found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        
    }
}

const getdeleteuserbyid = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await User.deleteOne({_id: id});
        res.status(200).json(data)
    } catch (error) {
        
        
    }
}
const getdeleteContacts = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await Contact.deleteOne({_id: id});
        res.status(200).json(data)
    } catch (error) {
        
        
    }
}
const userbyid = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id} , { password :0});
        res.status(200).json(data)
    } catch (error) {
        
        
    }
}
const updateuserbyid = async (req,res) =>{
    try {
        const id = req.params.id;
        const updateuserdata = req.body;
        const updatedata = await User.updateOne({_id: id} , { $set : updateuserdata,});
        res.status(200).json(updatedata);
    } catch (error) {
        
        
    }
}
module.exports = {getAllUsers , getAllContacts , getdeleteuserbyid, userbyid , updateuserbyid , getdeleteContacts};