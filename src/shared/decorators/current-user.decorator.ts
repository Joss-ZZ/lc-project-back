import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from 'src/modules/auth/strategies/jwt.strategy';

// export const CurrentUser = (...args: string[]) => SetMetadata('current-user', args);

export const CurrentUser = createParamDecorator((_: string, ctx: ExecutionContext) => {
	const user = ctx.switchToHttp().getRequest<{ user: Payload }>().user;

	if (!user) {
		return null;
	}

	return user; // extract a specific property only if specified or get a user object
});
