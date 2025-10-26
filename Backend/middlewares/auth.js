// middlewares/auth.js
const jwt = require("jsonwebtoken");


const Authorization = async (req, res, next) => {

    const token = req.header('Authorization');


    if(!token) {
        return res.status(401).json({message: "Access denied, no token provided"});
    }
    
    // console.log(token)

    try {

        const splitToken = token.split(" ")
        // console.log(splitToken);

        const realToken = splitToken[1]
        // console.log(realToken);
        
        
        const decoded = Jwt.verify(realToken, process.env.ACCESS_TOKEN)
        console.log(decoded);
       

        if(!decoded) {
            return res.status(401).json({message: "Invalid token"});
        }

       req.user = decoded.user
        //  console.log(req.user);
        //  console.log(req.user.username)


        next()
        
        
    } catch (error) {
        return res.status(500).json(error.message)
    }

}
module.exports = Authorization;
