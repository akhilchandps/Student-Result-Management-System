import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const secretKey= process.env.JWTKEY

const authMiddileware=(req,res,next)=>{
const cookies= req.headers.cookie;
console.log(cookies);
const cookie= cookies.split(';');
for(let cooki of cookie){
   const [name,token]= cooki.trim().split('=');
   if(name=='AuthToken'){
    const verified= jwt.verify(token,secretKey);
    console.log(verified);
    req.Username = verified.Username;
    req.UserRole = verified.Role;
    console.log(verified);
    
    console.log(verified.Username);
    console.log(verified.Role);
    break;
   }
}
next();
}

export {authMiddileware};



// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';


// dotenv.config();
// const secretKey = process.env.SecretKey;

// const authMiddileware = (req, res, next) => {
 
//   try {
 
//     const token = req.cookies.AuthToken;

//     console.log("tets", token)
//     if (!token) {
       
//       return res.status(401).json({ message: "Authentication token not found" });
//     }

//     const verify = jwt.verify(token, secretKey);
//     req.Username = verify.Username;
//     req.UserRole = verify.Role;
//     console.log(verify);
    
//     console.log(verify.Username);
//     console.log(verify.Role);
    
    

//     next();
//   } catch (error) {
//     console.error("Error in authMiddileware:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };






// export { authMiddileware };
