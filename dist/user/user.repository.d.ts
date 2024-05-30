import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByUsername(username: string): Promise<User>;
}
