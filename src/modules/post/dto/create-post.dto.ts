import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsNotEmpty()
	@IsString()
	authorId: string;

	@IsNotEmpty()
	@IsString()
	categoryId: string;
}
