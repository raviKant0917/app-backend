import jwt from 'jsonwebtoken';

export const jwtAuth = async(req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(501).json({
            message: "Something went wrong"
        })
    }else{
        token = token.split(" ")[1];
        const user = await jwt.verify(token,process.env.SECRET_KEY);
        res.status()
    }
}