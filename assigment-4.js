//Assement 4 . name Eslam fahmy . phone : 01028209843 .group c46 sun&wed 8pm online

import express from 'express'
import fs from 'fs'

const router = express.Router()

let users = JSON.parse(fs.readFileSync("users.json").toString())



// Q1

router.post('/user',(req,res)=>{

    let {name , age , email} = req.body

    let user = users.find(user => user.email == email)

    if(user){
        return res.json({message:"Email already exists."})
    }

    let id = users.length + 1

    users.push({id , name , age , email})

    fs.writeFileSync("users.json",JSON.stringify(users))

    res.json({message:"User added successfully."})

})



// Q2

router.patch('/user/:id',(req,res)=>{

    let {id} = req.params
    let {name , age , email} = req.body

    let user = users.find(user => user.id == id)

    if(!user){
        return res.json({message:"User ID not found."})
    }

    if(name || age || email){

        if(name){
            user.name = name
        }

        if(age){
            user.age = age
        }

        if(email){
            user.email = email
        }

    }

    fs.writeFileSync("users.json",JSON.stringify(users))

    res.json({message:"User updated successfully."})

})



// Q3

router.delete('/user/:id',(req,res)=>{

    let {id} = req.params

    let userIndex = users.findIndex(user => user.id == id)

    if(userIndex == -1){

        return res.json({message:"User ID not found."})

    }else{

        users.splice(userIndex,1)

        fs.writeFileSync("users.json",JSON.stringify(users))

        return res.json({message:"User deleted successfully."})
    }

})



// Q4

router.get('/user/getByName',(req,res)=>{

    let {name} = req.query

    let user = users.find(user => user.name == name)

    if(!user){

        return res.json({message:"User name not found."})

    }else{

        res.json(user)

    }

})



// Q5

router.get('/user',(req,res)=>{

    res.json(users)

})



// Q6

router.get('/user/filter',(req,res)=>{

    let {minAge} = req.query

    let filterUsers = users.filter(user => user.age >= minAge)

    if(filterUsers.length == 0){

        return res.json({message:"no user found"})

    }else{

        res.json(filterUsers)

    }

})



// Q7

router.get('/user/:id',(req,res)=>{

    let {id} = req.params

    let user = users.find(user => user.id == id)

    if(!user){

        return res.json({message:"User not found."})

    }else{

        res.json(user)

    }

})



export default router