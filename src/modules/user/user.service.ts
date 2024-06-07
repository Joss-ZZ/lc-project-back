import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { encryption } from '../../utils/encryption';
import { AresExeption } from '../../core/common/ares-exeption-error';
import { EnumAresError } from '../../core/common/ares-error.enum';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(
		private readonly _jwtService: JwtService,
		private readonly _prismaService: PrismaService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const { password, email } = createUserDto;
		const passEncry = await encryption(password);

		const existsEmail = await this._prismaService.user.findFirst({
			where: {
				email,
			},
		});

		if (existsEmail) AresExeption.error(EnumAresError.U004);

		const newUser = await this._prismaService.user.create({
			data: {
				lastname: createUserDto.lastname,
				firstname: createUserDto.firstname,
				email: createUserDto.email,
				position: createUserDto.position,
				password: passEncry,
			},
		});

		return newUser;
	}

	async findOne(id: number, exists = true): Promise<User> {
		if (exists) await this._exists(id);

		const user = await this._prismaService.user.findFirst({
			where: {
				id: id,
			},
		});

		return user;
	}

	remove(id: number): string {
		return `This action removes a #${id} ctUsuario`;
	}

	private async _exists(id: number): Promise<void> {
		AresExeption.expect(id).not.toBeNumber(EnumAresError.G002);

		const user = await this._prismaService.user.findFirst({
			where: {
				id: id,
			},
		});

		AresExeption.expect(user).toBeNull(EnumAresError.U001);
	}
}
