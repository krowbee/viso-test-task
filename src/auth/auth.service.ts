/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma/browser';
import { accessTokenOptions, refreshTokenOptions } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(
      payload,
      accessTokenOptions,
    );

    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshTokenOptions,
    );

    return { accessToken, refreshToken };
  }

  async verifyAccess(
    accessToken: string,
  ): Promise<{ id: string; email: string } | false> {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: accessTokenOptions.secret,
      });
      return payload;
    } catch {
      return false;
    }
  }

  async verifyRefresh(
    refreshToken: string,
  ): Promise<{ id: string; email: string } | false> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshTokenOptions.secret,
      });
      return payload;
    } catch {
      return false;
    }
  }
}
