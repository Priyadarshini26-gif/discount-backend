const isAdmin =(req,res,nest)=>{
    if(req.user.role !=="ADMIN"){
        return res.status(403).json({message:"Admin access only"});
    }
    next();
};

export default isAdmin;