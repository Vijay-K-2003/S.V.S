import passport from "passport";
import  {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./models/user.js";
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback/",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    
     const user = await User.findOrCreate({googleId: profile.id, username: profile.displayName, email: profile.emails[0].value}, function(err, user){
        //  console.log(profile);
        //  console.log(user);
        
         return cb(err, user);
     })
    
  }));

  passport.serializeUser((user, cb) => {
    // done(null, user.id);
    // console("Serializing user", user);
    cb(null, user.id);
});

passport.deserializeUser(async(id, cb)=>{
    const user = await User.findOne({where: {id}}).catch((err) => {
        console.log("Error in deserializing");
        cb(err, null);
    });

    if(user)
    {
        cb(null, user);
    }
     
    });

   


