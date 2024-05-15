import { Module } from '@nestjs/common';
import { ProgressModule } from './progress/progress.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './progress/progress.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      url: process.env.DB_URI,
      entities: [Progress, User],
      synchronize: true,
  }),
  ProgressModule,
  AuthenticationModule
]
})
export class AppModule {}
