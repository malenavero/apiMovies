const Movie = require ('./../models/movieModel');

class movieService {

    getMovies(limit, offset){
        const query = Movie.find().exec();
        return query;
    };

    getMovieById(id){
        const query = Movie.findById(id).exec();
        return query;
    };

    checkMovie(id) {
        const query = Movie.findById(id).exec();
        return query;
    };

    postMovie(data){
        const newMovie = new Movie(data);
        return newMovie.save();
    };

    editMovie(id, data){
        const query = Movie.findByIdAndUpdate(id, data);
        return query;
    };
    
    deleteMovie(id){
        const query = Movie.findByIdAndDelete(id);
        return query;
    };

};

module.exports = movieService;