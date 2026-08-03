import multer from "multer"


// configur storage 

const storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename: (req,file,cb)=>{
        cb(null,`${file.originalname}`)
    },
})
// file filter

const fileFilter =(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/png","image/jpg"]

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else {
        cb(new Error("only .jpeg and .jpg formats are allowed"),false)
    }
}

const upload = multer ({storage,fileFilter})
export default upload