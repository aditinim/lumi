const userModel= require("../models/user.model");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");


async function registerUser(req, res){
    const {username, email, password}= req.body;

    //pehle check krenge ki is email aur username se koi user exist to nahi krta hai 
    const isAlreadyRegister= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isAlreadyRegister){
        return res.status(401).json({
            messaage: "User already exixsts"
        })
    }

    //agar user nahi hai to register kar denge

    //first hash the password

    const hash= await bcrypt.hash(password, 10);

    const user= await userModel.create({
        username,
        email,
        password: hash
    })

    // aur ab ek token bnega

    const token= jwt.sign({
        id:user._id,
        username: user.username
    }, process.env.JWT_SECRET, 
    {
        //token expire kab hoga
        expiresIn: "3d"
    })

    //set token in the cookie
    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function loginUser(req, res){
    const {email, password, username} = req.body;

    //pehle find krenge ki user hai ki nahi
    const user= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");

    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    //ab password ko check krenge

    const isPasswordValid= await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    //agar sab theek hua to ab token dekhenge

    const token = jwt.sign(
        {
            id:user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}
module.exports= {
    registerUser,
    loginUser
}