import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeController } from './recipe/recipe.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/user/user.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, RecipeController, AuthController],
  providers: [AppService],
})
export class AppModule {}
