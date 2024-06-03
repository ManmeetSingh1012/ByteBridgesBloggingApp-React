import mongoose, { Document, Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
// Define interface for user document
interface userdata extends Document {
    username: string;
    email: string;
    password: string;
    blogs: Array<mongoose.Schema.Types.ObjectId>;
    history : Array<mongoose.Schema.Types.ObjectId>;
    acesstoken : string;
    genrateAccessToken: () => string;
    ispassowrdMatch: (password: string) => boolean;
}

// Define user schema
const UserSchema = new Schema<userdata>({
    username: { type: String, required: true , unique: true, index:true},
    email: { type: String, required: true },
    password: { type: String, required: true },

    blogs:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    
    }],

    history:[

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

    , 
    acesstoken: {
        type: String
     }




},{timestamps:true});

// Create and export User model

UserSchema.pre('save', async function(next) {

    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})


UserSchema.methods.ispassowrdMatch = async function(password: string)
{
    return await bcrypt.compare(password, this.password)

}


UserSchema.methods.genrateAccessToken = function (): string {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '30d'
      }
    );
  };


export const User = mongoose.model<userdata>('User', UserSchema);
export {userdata}
