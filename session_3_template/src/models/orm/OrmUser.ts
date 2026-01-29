import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"users"})
export class OrmUser {
    @PrimaryGeneratedColumn()
    user_id: number;
    @Column()
    user_uuid: string;
    @Column()
    email: string;
    @Column()
    password_hash: string;
    @Column()
    created_at: string;
    @Column()
    modified_at: string;
}