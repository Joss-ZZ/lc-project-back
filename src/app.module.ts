import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapResponseInterceptor } from './core/interceptors/wrap-response/wrap-response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot(),
    PrismaModule.forRoot(),
  ],
  controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: WrapResponseInterceptor,
		},
	],
})
export class AppModule {}
