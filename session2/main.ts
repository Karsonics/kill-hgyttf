import express, { Application, Request, Response } from "express";
import {RequestAPI} from "./models/RequestAPI";
import {ResponceAPI} from "./models/ResponceAPI";
import * as fs from "fs";
import * as_from "lodash-es";


const app: Application = express();

app.get(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use((req, res, next) => {
    if(req.body.api_key === undefined){
        res.status(500).json({
            "error": "No API key",
        })
    }
    next();
})

app.get("/hello", (req,res) => {
    res.send("params + " + JSON.stringify(req.query));
});


app.post("/webform/:form_id", (req,res) => {
    let form_id  = req.params.form_id;
    if (form_id > 0 ) {
        let name = req.body.name;
        let responce = {
            success: true,
            form_id: form_id,
            upper: name.toUpperCase()
        };
        res.status(200).json(responce);

    }else{
        res.status(404);
    }

})


app.post("/api/register", (req:Request<{},{},RequestAPI>,res: Response<ResponceAPI>) => {
   console.log(req.query);
   console.log(req.params);
   console.log(req.body);


   let request = req.body as RequestAPI;
   let registerTime = moment.utc();

   let database = [];
   let pathDatabase = "./public/database.json";
   if(fs.existsSync(pathDatabase)){
       database = JSON.parse(fs.readFileSync(pathDatabase)as string);
   }
   database.push(request.name);

   database = _.orderBy(database);
   database = _.reverse(database); //desc

   fs.writeFileSync(pathDatabase, JSON.stringify(database));

   let responce = {
       success: true,
       upper: request.name.toUpperCase()
   } as ResponceAPI;
   res.json(responce);

});





app.listen(8000, () =>{
    console.log("Server running http://localhost:8000");
    // hhtp://127.0.0.1:8000
});

