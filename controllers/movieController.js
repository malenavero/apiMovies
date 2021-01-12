class movieController {

    constructor(movieService){
        this.movieService = movieService
    };

    //funcion para chequear si existe el di en la db
    async checkId(id) {
        try {
            await this.movieService.checkMovie(id);
            return true
        }catch(err){
            return false
        };
    };

    async getMovies(req, res){
        //paginado
        const limit = 5;
        let page = 1;

        if(req.query.page){
            page = parseInt(req.query.page)
        };

        const offset = limit * (page - 1);
        //
        try {
            const allMovies = await this.movieService.getMovies(limit, offset);
            res.status(200).send(allMovies)
        }catch(err){
            console.log(err)
            res.status(500).send("La busqueda no pudo ser procesada")
        };
        
    };

    async getMovieById(req, res){

        const { id } = req.params
        const isMovie = await this.checkId(id);

        if (isMovie){
            try {
                const aMovie = await this.movieService.getMovieById(id);
                res.status(200).send(aMovie)
            }catch(err){
                console.log(err)
                res.status(500).send("La busqueda no pudo ser procesada, corrobore que ingreso bien el id")
            };  
        }else{
            res.send('El id no existe en la base de datos')
        };     
    };

    async postMovie(req, res){
        const { name, category, type } = req.body;
        const  image  = req.file.path
        if( name && category  && image ) {
            try {
                const data = {
                    name: name.toLowerCase(),
                    category: category.toLowerCase(),
                    image: image,
                    type: type
                };
                await this.movieService.postMovie(data);
                res.status(200).send("Pelicula agregada con exito")
            }catch(err){
                console.log(err);
                res.status(500).send("Fallo el proceso de creacion")
            }
        }else{
            res.status(400).send("Falta informacion necesaria");
        };
    };

    async editMovie(req, res){
        const  id  = req.params.id;
        const isMovie = await this.checkId(id);

        if (isMovie){
            const data = req.body;
            if(req.file){
                data.image = req.file.path
                };
      

            await this.movieService.editMovie(id, data);
            res.status(200).send("Pelicula modificada con exito")
        }else{
            res.send("El id no existe en la base de datos")
        };
    };
    
    async deleteMovie(req, res){
        const  id  = req.params.id;
        const isMovie = await this.checkId(id);

        if (isMovie){
            try {
                await this.movieService.deleteMovie(id);
                res.status(200).send("Pelicula borrada con exito");
            }catch(err){
                console.log(err)
                res.status(500).send("Fallo el proceso de borrado")
            };
        }else{
            res.send('El id no existe en la base de datos')
        };
    };
};

module.exports = movieController;