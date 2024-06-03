import { Router  } from "express";
import { addcomment , deletecomment , editcomment , allcomment } from "../controller/comment.controller";
import { verifyjwt } from "../middlewares/auth.middlewares";
const comment:Router = Router()

comment.route("/addcomment").post(verifyjwt,addcomment)

comment.route("/editcomment/:id").put(verifyjwt,editcomment)

comment.route("/deletecomment/:id").delete(verifyjwt,deletecomment)

comment.route("/getallcomment/:id").get(allcomment)


export default comment;