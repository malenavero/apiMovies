function checkAdmin (req, res, next) {
    if( req.user){
        if(req.user.isAdmin){
            next()
        }
        else {
            res.status(403).send("No tiene derechos de Admin")
        };
    }else{
        res.status(401).send("No estas logueado")
    };
};

module.exports = checkAdmin;