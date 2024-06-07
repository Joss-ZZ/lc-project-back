import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiEndpoint, getPathController } from '../../config/endpoint';
import { AresEntityResponse, AresResponse } from '../../core/common/ares-entity-response';
import { ResponseAuthDto } from './dto/response-auth.dto';

@ApiTags(ApiEndpoint.AUTH)
@Controller(getPathController(ApiEndpoint.AUTH))
export class AuthController {
	constructor(private readonly _authService: AuthService) {}

	@Post('login')
	async loginUser(@Body() loginAuthDto: LoginAuthDto): AresResponse<ResponseAuthDto> {
		return await AresEntityResponse.response(
			'Session logged in successfully',
			this._authService.login(loginAuthDto)
		);
	}

	@Post('isAuthenticated')
	async isAuthenticated(): AresResponse<boolean> {
		return await AresEntityResponse.response(
			'User is authenticated',
			this._authService.isAuthenticated()
		);
	}
}
