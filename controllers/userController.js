class userController {

    constructor(userService){
        this.userService = userService
    };

    //funcion para chequear si existe el di en la db
    async checkId(id) {
        try {
            await this.userService.checkUser(id);
            return true
        }catch(err){
            return false
        };
    };

    async getUsers(req, res){

        const limit = 5;
        let page = 1;

        if(req.query.page){
            page = parseInt(req.query.page)
        };

        const offset = limit * (page - 1);
        //
        try {
            const allUsers = await this.userService.getUsers(limit, offset);
            res.status(200).send(allUsers)
        }catch(err){
            console.log(err)
            res.status(500).send("La busqueda no pudo ser procesada")
        };
    };

    async getUserById(req, res){

        const { id } = req.params
        const isUser = await this.checkId(id);
        console.log(isUser)

        if (isUser){
            try {
                const aUser = await this.userService.getUserById(id);
                res.status(200).send(aUser)
            }catch(err){
                console.log(err)
                res.status(500).send("La busqueda no pudo ser procesada, corrobore que ingreso bien el id")
            };  
        }else{
            res.send('El id no existe en la base de datos')
        };     
    };

    async postUser(req, res){
        const { name, password, isAdmin } = req.body;

        if( name && password ) {
            try {
                const data = {
                    name: name.toLowerCase(),
                    password: password,
                    isAdmin: isAdmin
                };
                await this.userService.postUser(data);
                res.status(200).send("Usuario agregado con exito")
            }catch(err){
                console.log(err);
                res.status(500).send("Fallo el proceso de creacion")
            }
        }else{
            res.status(400).send("Falta informacion necesaria");
        };
    };

    async editUser(req, res){
        const  id  = req.params.id;
        const isUser = await this.checkId(id);

        if (isUser){
            const data = req.body;
            await this.userService.editUser(id, data);
            res.status(200).send("Usuario modificado con exito")
        }else{
            res.send("El id no existe en la base de datos")
        };
    };
    
    async deleteUser(req, res){
        const  id  = req.params.id;
        const isUser = await this.checkId(id);

        if (isUser){
            try {
                await this.userService.deleteUser(id);
                res.status(200).send("Usuario borrado con exito");
            }catch(err){
                console.log(err)
                res.status(500).send("Fallo el proceso de borrado")
            };
        }else{
            res.send('El id no existe en la base de datos')
        };
    };
};

module.exports = userController;