import { Injectable } from '@nestjs/common';
import { Category, Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async category(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return (await this.prisma.category.findUnique({
      where,
    })) as Category | null;
  }

  async categories(): Promise<Category[]> {
    return (await this.prisma.category.findMany()) as Category[];
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return (await this.prisma.category.create({ data })) as Category;
  }

  async updateCategory(params: {
    data: Prisma.CategoryUpdateInput;
    where: Prisma.CategoryWhereUniqueInput;
  }): Promise<Category> {
    const { where, data } = params;
    return (await this.prisma.category.update({ where, data })) as Category;
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    return (await this.prisma.category.delete({ where })) as Category;
  }
}
