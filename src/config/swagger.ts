import { HttpStatus, Type } from '@nestjs/common';

import { ApiResponseOptions } from '@nestjs/swagger';

export const swaggerConfig = {
	title: 'LC Project App',
	description: 'The  API description',
	version: '1.0.0',
};

// export class ResponseError {
// 	@ApiProperty()
// 	statusCode: string;

// 	@ApiProperty({
// 		type: Array,
// 	})
// 	message: string | string[];

// 	@ApiProperty()
// 	@ApiPropertyOptional()
// 	error: string;
// }

export function response200<T>(type: Type<T>, description?: string): ApiResponseOptions {
	// const entityResponse: EntityResponse = {
	// 	statusCode: 200,
	// 	message: 'string',
	// 	error: false,
	// 	result: type,
	// };
	return {
		status: HttpStatus.OK,
		type,
		description,
	};
}

// export function response400(description?: string): ApiResponseOptions {
// 	return {
// 		status: HttpStatus.BAD_REQUEST,
// 		type: ResponseError,
// 		description,
// 	};
// }
