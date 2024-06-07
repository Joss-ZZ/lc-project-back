import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ResponseAuthDto {
	@ApiProperty()
	user: User;

	@ApiProperty()
	token: string | null;
}
