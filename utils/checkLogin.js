function checkLogin (req, res, next) {
    if(req.user){
        next()
    }else{
        res.status(401).send("No estas logueado")
    };
};

module.exports = checkLogin;