const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const Users = require("../models/users")

passport.serializeUser((user,done) => {
    done(null,user.id)
});

passport.deserializeUser(async (id,done) => {
 let user = await Users.findById(id)
 done(null,user)
});

passport.use('local-signup', new LocalStrategy(

    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    async (req, email, password, done) => {

      let generateHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };

      let user = Users.findOne({email: email})

        .then(async function(user) {

        if (user) {
          return done(null, false, req.flash('signupMessage',"El email ya existe"));

        } else {
            let hashPassword = generateHash(password);
            let newUser = new Users();
            newUser.email = email;
            newUser.password = hashPassword,
            newUser.fullname = req.body.fullname 
            await newUser.save()
            done(null,newUser);

        }

      });

    }

  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, async (req, email, password, done) => {
      
      let user = await Users.findOne({email: email});
      if(!user){
        return done(null,false, req.flash("signinMessage","El usuario no existe"))
      }
      if(!user.comparePassword(password)){
      return done(null,false, req.flash("signinMessage","Contraseña incorrecta"))
    }
    done(null,user)
  
  }

    ))

