import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
import { UserRole } from "./user.enum";

@Entity({ name: "nest-users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ nullable: false, unique: true })
    username: string;
    @Column({ nullable: false })
    password: string;
    @Column()
    role: UserRole;
}