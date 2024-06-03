import { Router  } from "express";
import multer from "multer";
import { addblog, editblog, deleteblog, getblog, getallblog, getallbloglatest,getallbloguser, getallblogtoprated ,editbloglikes } from "../controller/blog.controller";
import { verifyjwt } from "../middlewares/auth.middlewares";

const blog:Router = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// ,upload.single('coverimage')

blog.route("/addblog").post(verifyjwt,upload.single('coverimage'),addblog)
blog.route("/editblog/:id").put(verifyjwt,upload.single('coverimage'),editblog)

blog.route("/editbloglikes/:id").put(verifyjwt,editbloglikes)

blog.route("/deleteblog/:id").delete(verifyjwt,deleteblog)

blog.route("/getblog/:id").get(getblog)



blog.route("/getallblog").get(getallblog)
blog.route("/getallbloguser").get(verifyjwt,getallbloguser)


blog.route("/getallblog/latest").get(verifyjwt,getallbloglatest)
blog.route("/getallblog/toprated").get(verifyjwt,getallblogtoprated)

export default blog;