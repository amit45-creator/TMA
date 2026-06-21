import mongoose from "mongoose";

const  userSchema= new mongoose.Schema (
    {
        name: {
            type: String,
            required : true,
        },
        email:{
            type: String,
            required:true,
            unique:true,
        },
        password:{
            type: String,
            required: true,
        },
        profileImageUrl:{
            type: String,
            default:"https://imgs.search.brave.com/J_b7IhP9UnJUQKrPzUaUsCSMCoTGm3H64wM77swL-1o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/ODc3NDExMS92ZWN0/b3IvYXZhdGFyLW9y/LXBlcnNvbi1zaWdu/LXByb2ZpbGUtcGlj/dHVyZS1wb3J0cmFp/dC1pY29uLXVzZXIt/cHJvZmlsZS1zeW1i/b2wuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTZxdzFMUkc1/M3owMFJYSm5WS1FD/NThXN1huVzJnZFFm/R0JJUjQzRTk3T2M9",
        },
        role: {
            type:String,
            enum:["admin","user"],
            default: "user",
        },
       
    },
     {timestamps: true}
)

const User = mongoose.model("User",userSchema)
export default User
