import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ServicesModule } from '../../shared/services/services.module';
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
		ConfigModule,
		ServicesModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
	exports: [JwtModule],
})
export class AuthModule {}
