import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('SECRET_KEY_JWT'),
				signOptions: { expiresIn: '1h' },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [UserController],
	providers: [UserService, PrismaService],
})
export class UserModule {}
