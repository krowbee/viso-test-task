import { Injectable } from '@nestjs/common';
import { Recipe, Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async recipe(
    recipeWhereUniqueInput: Prisma.RecipeWhereUniqueInput,
  ): Promise<Recipe | null> {
    return (await this.prisma.recipe.findUnique({
      where: recipeWhereUniqueInput,
    })) as Recipe | null;
  }

  async recipes(where?: Prisma.RecipeWhereInput): Promise<Recipe[]> {
    return (await this.prisma.recipe.findMany({ where })) as Recipe[];
  }

  async createRecipe(data: Prisma.RecipeCreateInput): Promise<Recipe> {
    return (await this.prisma.recipe.create({ data })) as Recipe;
  }

  async updateRecipe(params: {
    data: Prisma.RecipeUpdateInput;
    where: Prisma.RecipeWhereUniqueInput;
  }): Promise<Recipe> {
    const { where, data } = params;
    return (await this.prisma.recipe.update({ data, where })) as Recipe;
  }

  async deleteRecipe(where: Prisma.RecipeWhereUniqueInput): Promise<Recipe> {
    return (await this.prisma.recipe.delete({ where })) as Recipe;
  }
}
