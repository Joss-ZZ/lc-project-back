import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

const CloudinaryProvider = {
	provide: 'CLOUDINARY',
	useFactory: () => {
	  return cloudinary.config({
		  cloud_name: process.env.CLOUDINARY_NAME,
		  api_key: process.env.CLOUDINARY_API_KEY,
		  api_secret:
			process.env.CLOUDINARY_API_SECRET,
	  });
	},
};

@Module({
	controllers: [PostController],
	providers: [CloudinaryProvider, CloudinaryService, PostService, PrismaService, ConfigService],
})
export class PostModule {}
