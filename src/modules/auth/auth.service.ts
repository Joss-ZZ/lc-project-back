import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { decrypted } from '../../utils/encryption';
import { Payload } from './strategies/jwt.strategy';
import { AresExeption } from '../../core/common/ares-exeption-error';
import { EnumAresError } from '../../core/common/ares-error.enum';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserSessionService } from '../../shared/services/user-session.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly _jwtService: JwtService,
		private readonly _userSessionService: UserSessionService,
		private readonly _prismaService: PrismaService
	) {}

	async login(loginAuthDto: LoginAuthDto): Promise<ResponseAuthDto> {
		const { email, password } = loginAuthDto;

		const user = await this._prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw AresExeption.error(EnumAresError.U003);
		}

		AresExeption.expect(await decrypted(password, user.password)).toBeFalsy(EnumAresError.U003);

		const payload: Payload = {
			userId: user.id,
		};

		const token = await this._jwtService.signAsync(payload);

		return {
			user,
			token,
		};
	}

	isAuthenticated(): Promise<boolean> {
		return this._userSessionService.isAuthenticated();
	}
}
