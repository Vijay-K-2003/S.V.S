import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
       
        googleId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            // required: [true, "Name cannot be empty!"]
        },
        email: {
            type: String,
            // required: [true, "Email cannot be empty!"]
        },
     
       password: {
           type: String,
        //    required: [true, "Password cannot be empty!"]
       }
});
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);
export default User;