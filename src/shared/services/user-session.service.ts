
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from 'src/modules/auth/strategies/jwt.strategy';

@Injectable()
export class UserSessionService {
	constructor(
		@Inject(REQUEST) private _request: Request,
		private readonly _jwtService: JwtService,
		private readonly _configService: ConfigService
	) {}

	async getPayload(): Promise<Payload> {
		try {
			const token = this._request.headers.authorization?.split(' ')[1];

			// Verificar y decodificar el token usando la clave secreta
			const decodedToken = await this._jwtService.verifyAsync(token, {
				secret: this._configService.get('SECRET_KEY_JWT'),
			});

			const { userId } = decodedToken as Payload;

			return {
				userId,
			};
		} catch {
			throw new UnauthorizedException();
		}
	}

	async isAuthenticated(): Promise<boolean> {
		try {
			const token = this._request.headers.authorization?.split(' ')[1];

			// Verificar y decodificar el token usando la clave secreta
			await this._jwtService.verifyAsync(token, {
				secret: this._configService.get('SECRET_KEY_JWT'),
			});

			return true;
		} catch {
			return false;
		}
	}
}
