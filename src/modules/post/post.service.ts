import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class PostService {

	constructor(
		private readonly _prismaService: PrismaService,
		private readonly _cloudinaryService: CloudinaryService,
		private readonly configService: ConfigService
	) {}

	async create(createPostDto: CreatePostDto, image: Express.Multer.File): Promise<Post> {
		const { title, content, authorId, categoryId } = createPostDto;

		const responseCloudinary = await this._cloudinaryService.uploadFile(image);
		
		const post = await this._prismaService.post.create({
			data: {
				title,
				content,
				mainImageUrl: responseCloudinary?.url,
				author: {
					connect: {
						id: parseInt(authorId)
					}
				},
				category: {
					connect: {
						id: parseInt(categoryId)
					}
				},
			},
			include: {
				author: true,
				category: true,
			},
		});

		return post;
	}

	async findAll(): Promise<Post[]> {
		const products = await this._prismaService.post.findMany({
			orderBy: {
				id: 'desc',
			},
			include: {
				author: true,
				category: true,
			},
		});
		return products;
	}

	async findById(id: string): Promise<Post> {
		await this._prismaService.post.update({
			where: { id: parseInt(id) },
			data: {
			  views: {
				increment: 1,
			  },
			},
			include: {
			  author: true,
			  category: true,
			},
		});
		const post = await this._prismaService.post.findFirst({
			where: { id: parseInt(id) },
			orderBy: {
				publishedDate: 'desc'
			},
			include: {
				author: true,
				category: true,
			},
		});
		return post;
	}

	async findAllCategories() {
		return this._prismaService.category.findMany();
	}

	remove(id: number): string {
		return `This action removes a #${id} profile`;
	}
}
