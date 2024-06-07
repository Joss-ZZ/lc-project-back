import { Module } from '@nestjs/common';
import { UserSessionService } from './user-session.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [JwtModule, ConfigModule],
	providers: [UserSessionService],
	exports: [UserSessionService],
})
export class ServicesModule {}
