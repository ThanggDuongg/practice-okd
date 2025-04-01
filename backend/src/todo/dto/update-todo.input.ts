import { TodoStatus } from '../entities/todo.entity';
import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => TodoStatus, { nullable: true })
  status?: TodoStatus;
}
