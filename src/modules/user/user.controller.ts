import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService as UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiEndpoint, getPathController } from '../../config/endpoint';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AresEntityResponse, AresResponse } from '../../core/common/ares-entity-response';
import { User } from '@prisma/client';

@ApiTags(ApiEndpoint.USERS)
@Controller(getPathController(ApiEndpoint.USERS))
export class UserController {
	constructor(private readonly _userService: UserService) {}

	@Post('create')
	async create(@Body() createUserDto: CreateUserDto): AresResponse<User> {
		return await AresEntityResponse.response(
			'User created',
			this._userService.create(createUserDto)
		);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id') id: string): AresResponse<User> {
		return await AresEntityResponse.response('Find user by Id', this._userService.findOne(+id));
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string): string {
		return this._userService.remove(+id);
	}
}
