import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { Category, Post as PostEntity } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { AresEntityResponse, AresResponse } from 'src/core/common/ares-entity-response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint, getPathController } from 'src/config/endpoint';

@ApiBearerAuth()
@ApiTags(ApiEndpoint.POSTS)
@Controller(getPathController(ApiEndpoint.POSTS))
export class PostController {
	constructor(private readonly _postService: PostService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	async create(
		@Body() createPostDto: CreatePostDto,
		@UploadedFile() image: Express.Multer.File
	): AresResponse<PostEntity> {
		return await AresEntityResponse.response(
			'Post created',
			this._postService.create(createPostDto, image)
		);
	}

	@Get()
	async findAll(): AresResponse<PostEntity[]> {
		return await AresEntityResponse.response(
			'List posts',
			this._postService.findAll()
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/findAllCategories')
	async findAllCategories(): AresResponse<Category[]> {
		return await AresEntityResponse.response(
			'List categories',
			this._postService.findAllCategories()
		);
	}

	@Get(':id')
	async findById(
	  @Param('id') id: string,
	): AresResponse<PostEntity> {
		return await AresEntityResponse.response(
			'List post by Id',
			this._postService.findById(id)
		);
	}

	// @Patch(':id')
	// async update(
	// 	@Param('id') id: string,
	// 	@Body() updateProfileDto: UpdateProfileDto
	// ): AresResponse<ResponseProfileDto> {
	// 	return await AresEntityResponse.response(
	// 		'Updated company by Id',
	// 		this._productService.update(+id, updateProfileDto)
	// 	);
	// }

	@Delete(':id')
	remove(@Param('id') id: string): string {
		return this._postService.remove(+id);
	}
}
