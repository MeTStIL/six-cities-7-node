import type { TRequest, TRequestParams } from '../../libs';
import type { CreateUserDto, LoginUserDto } from './dto';
import type { UserRdo } from './rdo';

export type TCreateUserRequest = TRequest<TRequestParams, UserRdo, CreateUserDto>;
export type TLoginUserRequest = TRequest<TRequestParams, never, LoginUserDto>;
export type TLogoutUserRequest = TRequest<TRequestParams, never>;
