/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from 'generated/prisma/browser';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return (await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })) as User | null;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return (await this.prisma.user.create({ data })) as User;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return (await this.prisma.user.update({ data, where })) as User;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return (await this.prisma.user.delete({ where })) as User;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
