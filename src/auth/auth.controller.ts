import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request, CookieOptions } from 'express';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'none',
  maxAge: 1000 * 60 * 24 * 7,
};

@Controller()
export class AuthController {
  private logger = new Logger();
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { name: string; email: string; password: string },
  ) {
    const user = await this.userService.user({ email: body.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.userService.validatePassword(
      body.password,
      user.password,
    );
    if (isValidPassword) {
      const { refreshToken, accessToken } =
        await this.authService.generateTokens(user);

      res.cookie('refreshToken', refreshToken, cookieOptions);
      return { message: 'Logged in succesfull', accessToken: accessToken };
    }
  }

  @Post('/register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const userExist = await this.userService.user({ email: body.email });

    if (userExist) {
      throw new ConflictException({
        message: 'User with this email already exists;',
      });
    }

    body.password = await this.userService.hashPassword(body.password);
    const user = await this.userService.createUser(body);
    const { refreshToken, accessToken } =
      await this.authService.generateTokens(user);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    return {
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email },
      accessToken: accessToken,
    };
  }
}
