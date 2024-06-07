// import { BaseDto } from '@chirra/shared/base/base.dto';
// import { BaseEntity } from '@chirra/shared/base/base.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { plainToInstance, ClassConstructor } from 'class-transformer';
// import { ObjectLiteral, Repository } from 'typeorm';
// import { CalzatecExeption } from '../common/ares-exeption-error';
// import { EnumCalzatecError } from '../common/ares-error.enum';

// type E = BaseEntity & { id: number };

// export abstract class Generic<Entity extends E, Dto extends ClassConstructor<BaseDto>> {
// 	constructor(
// 		readonly dto: ClassConstructor<BaseDto>,
// 		private readonly _repository: Repository<E>
// 	) {}

// 	async findByid(id: number): Promise<Dto> {
// 		CalzatecExeption.expect(id).not.toBeNumber(EnumCalzatecError.G002);

// 		const exists = await this._repository.exist({
// 			where: {
// 				id,
// 				status: true,
// 			},
// 		});

// 		CalzatecExeption.expect(exists).toBeFalsy(EnumCalzatecError.G005);

// 		return plainToInstance(
// 			this.dto,
// 			await this._repository.findOneBy({
// 				id: id,
// 				status: true,
// 				company: {
// 					companyId: 1,
// 				},
// 			})
// 		) as unknown as Dto;
// 	}
// }
