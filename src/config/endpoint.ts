enum ApiConfig {
	VERSION = 'v1',
	PATH = 'api',
}

export enum ApiEndpoint {
	AUTH = 'auth',
	USERS = 'users',
	POSTS = 'posts',
	SWAGGER = 'swagger',
}

export function getPathController(endpoint: ApiEndpoint): string {
	return `${ApiConfig.PATH}/${ApiConfig.VERSION}/${endpoint}`;
}
