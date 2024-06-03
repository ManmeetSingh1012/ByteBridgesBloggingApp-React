import { Router , Request , Response} from "express";
import { login , logout , addnewuser, getuser , getuserbyid, updateuser, deleteuser } from "../controller/user.controller";
import { verifyjwt } from "../middlewares/auth.middlewares";


const user :Router = Router();

user.route("/getuser").get(verifyjwt,getuser)

user.route("/getuserbyid/:id").get(getuserbyid)

user.route("/signin").post(login)

user.route("/signup").post(addnewuser)

user.route("/logout").post(verifyjwt,logout)

user.route("/update").put(verifyjwt,updateuser)

user.route("/deleteuser").delete(verifyjwt,deleteuser)


/*
user.get('/get', (req:Request, res:Response) => {
   res.send('Express + TypeScript crud');
});*/


export default user;