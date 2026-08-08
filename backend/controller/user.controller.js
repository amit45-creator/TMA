import User from "../models/user.model.js"
import Task from "../models/task.models.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async(req,res,next)=>{
  try {
    const users = await User.find({role: "user"}).select("-password")

    const userWithTaskCounts=await Promise.all(
        users.map(async (user) =>{
            const pendingTasks =await Task.countDocuments({
                assignedTo:user._id,
                status: "Pending",
            })

          const inProgressTasks =await Task.countDocuments({
            assignedTo :  user._id,
            status: "In progress",
          })
             const completedTasks =await Task.countDocuments({
                      assignedTo :  user._id,
            status: "completed",
             })
             return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks,
             }
        })
    )

     res.status(200).json(userWithTaskCounts)
  }catch(error){
    next(error)
  }
}

export const getUserById =async (req,res,next)=>{
  try{
    const user=await User.findById(req.params.id).select("-password")
    if(!user){
      return next(errorHandler(404,"user not found!"))
    }
    res.status(200).json(user)
  } catch(error){
    next(error)
  }

}