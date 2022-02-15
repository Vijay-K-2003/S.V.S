const isLoggedIn = async (req, res, next) => {
    if(req.user)
    {
        console.log(req.user);
        return next();
    }
    res.status(401).json({message: "You are Unauthorized to do that"});
} 

export default isLoggedIn;