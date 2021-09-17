const express = require('express');
const router = express.Router();
const User = require("../Models/user");
const bcrypt =require("bcrypt");
const jwt =require("JsonWebToken");
// app.use("/api/root",(req,res,next)=>{
//     // console.log("First middleware");
//     // console.log(req.url);
//     // next();
//     const posts=[
//         {id:"101",name:"sathish"},
//         {id:"102",name:"saran"},
//         {id:"103",name:"sam"}
//     ];
    
//     res.status(200).json({posts:posts,Message:'Message fetched successfully'});
// });
// LKgrW0I5TQ7jWiur


router.get('/data',(req,res,next)=>{
    User.find().then(documents=>{
        res.status(200).json({Data:documents,Message:'Message fetched successfully'});
    });
    
    
});


router.post('/login',(req,res,next)=>{
  let fetchedUser;
  console.log(req.body.email);
  User.findOne({email:req.body.email})
  .then(user=>{
    if(!user){
      return res.status(401).json({message:"Auth Failed3"});  
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password,user.password);
    
  })
  
  .then(result=>{
    console.log(result)
    if(!result){
      
      return res.status(401).json({message:"Invalid authentication credentials!"
      });  
    }
    const jswt = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
      "secret_should_be_greater_at_all_times",
      {expiresIn:"1hr"})
      console.log(jswt)
      return res.status(200).json({
        "token": jswt
        // "expiresIn":3600,
        // "userid": fetchedUser._id
      })
  })
  .catch(err=>{
      console.log(err);
    return res.status(401).json(
      {message: "Invalid authentication credentials!"
  })
  });

});
router.post('/Register',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash =>{
      const users = new User({
        email: req.body.email,
        password : hash,
        name :req.body.name,
        jobtitle:req.body.jobTitle,
        contactnumber:req.body.contactNumber
      });
      console.log("SAthish"); 
     users.save()
      .then(result=>{
        res.status(201).json({
           message:"Added successfully",
           result: result
         }) ;
      })
      .catch(err=>{
          res.status(500).json(
            {message: "Email Already Exists"
        });
      });
    })
});


module.exports = router;