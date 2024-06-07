import { HttpStatus } from '@nestjs/common';

export enum TypeError {
	Information = 'I',
	Warning = 'W',
	Error = 'E',
}

export interface ErrorMenssage {
	message: string;
	typeError: TypeError;
	status?: HttpStatus;
}

export class EnumAresError {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	// Generico
	static get G001(): ErrorMenssage {
		return {
			message: 'No se pudo actualizar los datos',
			typeError: TypeError.Warning,
		};
	}
	static get G002(): ErrorMenssage {
		return {
			message: 'Ingrese un Id valido',
			typeError: TypeError.Warning,
		};
	}
	static get G003(): ErrorMenssage {
		return {
			message: 'No se pudo eliminar el registro',
			typeError: TypeError.Warning,
		};
	}
	static get G004(): ErrorMenssage {
		return {
			message: 'El registro ya se encuentra registrado',
			typeError: TypeError.Warning,
		};
	}
	static get G005(): ErrorMenssage {
		return {
			message: 'El registro no existe',
			typeError: TypeError.Warning,
		};
	}
	static get G006(): ErrorMenssage {
		return {
			message: 'Token incorrecto',
			typeError: TypeError.Error,
		};
	}

	// Auth
	static get A001(): ErrorMenssage {
		return {
			message: 'Sin autorizacion',
			typeError: TypeError.Error,
			status: HttpStatus.FORBIDDEN,
		};
	}

	// Usuario
	static get U001(): ErrorMenssage {
		return {
			message: 'El usuario no existe',
			typeError: TypeError.Error,
		};
	}
	static get U002(): ErrorMenssage {
		return {
			message: 'Usuario no autorizado',
			typeError: TypeError.Error,
		};
	}
	static get U003(): ErrorMenssage {
		return {
			message: 'Usuario/Contraseña incorrecta',
			typeError: TypeError.Warning,
			status: HttpStatus.FORBIDDEN,
		};
	}
	static get U004(): ErrorMenssage {
		return {
			message: 'El correo ya se encuentra registrado',
			typeError: TypeError.Warning,
		};
	}
	static get U005(): ErrorMenssage {
		return {
			message: 'El correo ya fue confirmado',
			typeError: TypeError.Warning,
		};
	}
	static get U006(): ErrorMenssage {
		return {
			message: 'Aun no verifica su correo electronico',
			typeError: TypeError.Warning,
		};
	}
	static get U007(): ErrorMenssage {
		return {
			message: 'El numero de celular ya se encuentra registrado',
			typeError: TypeError.Warning,
		};
	}
	static get U008(): ErrorMenssage {
		return {
			message: 'El correo no se encuentra registrado',
			typeError: TypeError.Error,
			status: HttpStatus.FORBIDDEN,
		};
	}

	// Email
	static get E001(): ErrorMenssage {
		return {
			message: 'Error al envial el correo',
			typeError: TypeError.Error,
		};
	}

	// SMS
	static get SS01(): ErrorMenssage {
		return {
			message: 'Error al enviar el SMS',
			typeError: TypeError.Error,
		};
	}

	// Code
	static get C001(): ErrorMenssage {
		return {
			message: 'Codigo de verificacion incorrecta',
			typeError: TypeError.Error,
		};
	}
	static get C002(): ErrorMenssage {
		return {
			message: 'Codigo expirado',
			typeError: TypeError.Warning,
		};
	}
	static get C003(): ErrorMenssage {
		return {
			message: 'El codigo debe contener 6 caracteres',
			typeError: TypeError.Warning,
		};
	}

	// Plan
	static get P001(): ErrorMenssage {
		return {
			message: 'El plan no existe',
			typeError: TypeError.Error,
		};
	}

	// Subscription
	static get S001(): ErrorMenssage {
		return {
			message: 'La subscripcion no existe',
			typeError: TypeError.Error,
		};
	}

	static get S002(): ErrorMenssage {
		return {
			message: 'Ya no tiene consultas disponibles',
			typeError: TypeError.Warning,
		};
	}
}
