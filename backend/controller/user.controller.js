import User from "../models/user.model.js"
import Task from "../models/task.models.js";

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