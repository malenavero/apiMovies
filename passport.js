const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userService = require("./services/userService");
const userInstance = new userService();
const bcrypt = require("bcrypt");



passport.use(

//1er param: passport local es una clase, por eso la instanciamos y le pasamos el modelo que va a utilizar.    
    new LocalStrategy(
      {
        usernameField: "name",
        passwordField: "password"
      },
//2do param: arrow function, recibe como parametro el username, una pass, y el callbak que permite continuar con la funcion despues del middleware o frenar ahi en caso de que no se validen las credenciales.

    async (username, password, cb) => {
        try{
            const userData = await userInstance.getByName(username.toLowerCase());


            //este usuario esta mal
            //(el if devuelve el null porque no recibe data), el 2do parametro del cb es si se puede loguear(400)
            if (!userData) {
                return cb(null, false)
            }


            //este usuario esta mal
            // se le pasa primero el txt plano y despues el hash y devuelve un boolean
            const compare = await bcrypt.compare(password, userData.password);
  
            if (!compare){
                return cb(null, false)
            }

            //este usuario esta bien
            return cb(null, userData) //podria modificar userData y poner true
            
        }catch(err){
            cb(null, false)
        };       
      }
    )
  );


  passport.serializeUser((user, cb) => {
    cb(null, user.name);
  });
  
  passport.deserializeUser(async (name, cb) => {
    const data = await userInstance.getByName(name);  
    cb(null, data);
  });