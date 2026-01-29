import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {OrmUser} from "./OrmUser";

@Entity({name:"session"})
export class OrmSession {

    @PrimaryGeneratedColumn()
    session_id: number;

    @Column()
    user_id: number;

    @Column()
    session_uuid: string;

    @Column()
    device_type: string;

    @Column()
    created_at: string;

    @Column()
    expires_at: string;

    @OneToOne(() => OrmUser)
    @JoinColumn({ name: "user_id" })
    user: OrmUser;

}