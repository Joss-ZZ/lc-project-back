import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	lastname: string;

	@ApiProperty()
	@IsString()
	firstname: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsString()
	position: string;
}
