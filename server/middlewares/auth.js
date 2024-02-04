import  Jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
   
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Token is missing',
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });

        }
        req.user = user;
        next()
    })
}