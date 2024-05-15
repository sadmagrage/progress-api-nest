import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "nest-progress" })
export class Progress {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ unique: true })
    attempt: number;
    @Column({ type: "bigint" })
    timestamp: number;
}