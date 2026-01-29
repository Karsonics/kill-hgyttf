import { DataSource } from "typeorm";
import {DbUser} from "../models/db/DbUser";
//import sha1
import * as sha1 from "js-sha1";
import {DbSession} from "../models/db/DbSession";
import {v4 as uuidv4} from 'uuid';
import {OrmUser} from "../models/orm/OrmUser";
import {OrmSession} from "../models/orm/OrmSession";


export class ControllerDatabase {
    //singleton
    private static _instance: ControllerDatabase;
    private constructor() {
        //init litesql datasource
        this.dataSource = new DataSource({
            type: "sqlite",
            database: "./database.sqlite",
            logging: false,
            synchronize: false,
            entities: [
                OrmUser,
                OrmSession,
            ]
        })
    }

    public static get instance(): ControllerDatabase {
        if (!ControllerDatabase._instance) {
            ControllerDatabase._instance = new ControllerDatabase();
        }
        return ControllerDatabase._instance;
    }

    //datasource
    private dataSource: DataSource;

    public async connect(): Promise<void> {
        await this.dataSource.initialize();
    }

    public async login(
        email: string,
        password: string,
    ): Promise<OrmSession|null> {
        let session: OrmSession = null;
        let passwordHashed = sha1(password);

        let user: OrmUser = await  this.dataSource.manager.findOne(
            OrmUser,{
                where:{
                    email:email,
                    password_hash:passwordHashed
                }
            }
        )

        if(user){
            user.modified_at = (new Date()).toString();
            await this.dataSource.manager.save(user)

            session = new OrmSession();
            session.user_id= user.user_id;
            session.session_uuid = uuidv4();
            await this.dataSource.manager.save(session)
            console.log(session.session_id)
        }
        return session;

    }





}
