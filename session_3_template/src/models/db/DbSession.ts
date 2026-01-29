import {DbUser} from "./DbUser";

export interface DbSession
{
    session_id:number;
    user_id:number;
    session_uuid:string;
    device_type:string;
    created_at:string;
    modified_at:string;


}
