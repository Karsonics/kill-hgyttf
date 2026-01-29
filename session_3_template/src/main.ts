import * as express from "express";
import {Application, request} from "express";
import * as fs from "fs";
import * as multer from "multer";
import {ControllerDatabase} from "./controllers/ControllerDatabase";


const main = async () => {
    try {
        const app: Application = express();
        const mult = multer();
        app.use(express.json());
        app.use(express.urlencoded({extended: true})); // get data from HTML forms
        app.use(mult.array("data"));

        await ControllerDatabase.instance.connect();


        app.post("/login",async (req,res)=>{
            let responce = {
                session_uuid: "",
                is_success: false
            };
            let reqBody = req.body;
            let session = await ControllerDatabase.instance.login(
                request.body.username,
                request.body.password, //wat is this wtf
            )
            if(session){
                responce.session_uuid = session.session_uuid;
                responce.is_success = true;
            }
            res.json(responce);


        })

        app.listen(
            8000,
            () => {
                console.log('Server started http://localhost:8000');
            }
        )
    }
    catch (e) {
        console.log(e);
    }
}
main();

