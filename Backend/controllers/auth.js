const bcrypt = require('bcryptjs')
const Auth = require("../models/auth")
const jwt = require('jsonwebtoken')


const signup = async (req,  res) => {

    const {fullname, email, gender, dateOfBirth, password} = req.body


    if (!fullname)
      return res.status(400).json({ success: false, message: "Please enter fullname field" });

    if (!email)
      return res.status(400).json({ success: false, message: "Please enter email field" });

    if (!gender)
      return res.status(400).json({ success: false, message: "Please enter gender field" });

    if (!dateOfBirth)
      return res.status(400).json({ success: false, message: "Please enter date of birth field" });

    if (!password)
      return res.status(400).json({ success: false, message: "Please enter password field" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be up to 6 characters" });

   


    const existingUser = await Auth.findOne({email})

    if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User account exist, please login'
        })
    }

    //hash password
     const hashedPassword = await bcrypt.hash(password, 12)



     const user = new Auth ({
         fullname,
         email,
         dateOfBirth,
         gender,
         password: hashedPassword

     })

     await user.save()



     res.status(201).json({
         success: true,
        message: 'User account created successful',
        data: user
     })

   
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: 'please enter all the fields'
            })
        }

        const existingUser = await Auth.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                message: 'User account not found, please signup'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }


        const AccessToken = jwt.sign({
            userId: existingUser._id
        }, process.env.ACCESS_TOKEN, {expiresIn: '1d'
        })

        const RefreshToken = jwt.sign({
            userId: existingUser._id
        }, process.env.REFRESH_TOKEN, {expiresIn: '7d'
        })

         res.status(200).json({
             success: true,
            message: 'User logged in successfully',
            user: {
                email: existingUser?.email, 
                fullname: existingUser?.fullname,
                userId: existingUser?._id,
                gender: existingUser?.gender,
                dateOfBirth: existingUser?.dateOfBirth

            } ,
            AccessToken,
            RefreshToken
        })

    }catch (error){
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const user = async (req, res) => {
    
    const userId = req.user.userId;

    const user = await Auth.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
            data: user
        });
    }
}



module.exports = {
    signup,
    login,
    user
}