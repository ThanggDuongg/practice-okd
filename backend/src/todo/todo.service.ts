import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoStatus } from './entities/todo.entity';
import { FindTodoInput } from './dto/find-todo.input';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoInput: CreateTodoInput) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoInput.title,
        status: createTodoInput.status || 'NOT_DONE_YET',
      },
    });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return await this.prisma.todo.update({
      where: { id },
      data: {
        title: updateTodoInput.title,
        status: updateTodoInput.status,
      },
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }

  async findByStatus(status: TodoStatus) {
    return await this.prisma.todo.findMany({
      where: { status },
    });
  }

  async findWithFilters(filters: FindTodoInput = {}) {
    console.log(filters);
    return await this.prisma.todo.findMany({
      where: {
        id: filters?.id ?? undefined,
        title: filters?.title
          ? { contains: filters.title, mode: 'insensitive' }
          : undefined,
        status: filters?.status
          ? TodoStatus[filters.status as keyof typeof TodoStatus]
          : undefined,
        createdAt:
          filters?.createdAfter || filters?.createdBefore
            ? {
                gte: filters?.createdAfter ?? undefined,
                lte: filters?.createdBefore ?? undefined,
              }
            : undefined,
      },
    });
  }
}
