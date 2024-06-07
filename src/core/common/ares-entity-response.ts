import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class EntityResponse<T> {
	@ApiProperty()
	statusCode: HttpStatus;
	@ApiProperty()
	message: string;
	@ApiProperty()
	error: boolean;
	@ApiProperty()
	result: Awaited<T> | null;
}

export type AresResponse<T> = Promise<EntityResponse<T>>;

export class AresEntityResponse {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	static async response<T>(message: string, result: Promise<T>): AresResponse<T> {
		return {
			statusCode: HttpStatus.OK,
			message,
			error: false,
			result: await result,
		};
	}
}
