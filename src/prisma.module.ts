import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // робить сервіс доступним у всіх інших модулях без імпорту
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
