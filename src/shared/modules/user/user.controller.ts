import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  type IConfig,
  type ILogger,
  type TResponse,
  type TRestSchema,
} from '../../libs';
import { Component } from '../../types';
import type { IUserService } from './user-service.interface';
import type { TCreateUserRequest, TLoginUserRequest, TLogoutUserRequest } from './user-requests.type';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers';
import { UserRdo } from './rdo';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<TRestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/register', method: HttpMethod.POST, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.POST, handler: this.login });
    this.addRoute({ path: '/check', method: HttpMethod.GET, handler: this.sessionPending });
    this.addRoute({ path: '/logout', method: HttpMethod.DELETE, handler: this.logout });
  }

  public async create({ body }: TCreateUserRequest, res: TResponse<UserRdo>): Promise<void> {
    if (await this.userService.findByEmail(body.email)) {
      throw new HttpError(StatusCodes.CONFLICT, 'A user with this email already exists.');
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public login(_req: TLoginUserRequest): Promise<never> {
    return this.sessionPending();
  }

  public async sessionPending(): Promise<never> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'User sessions are not available at this stage.');
  }

  public logout(_req: TLogoutUserRequest, res: TResponse<never>): void {
    this.noContent(res);
  }
}
