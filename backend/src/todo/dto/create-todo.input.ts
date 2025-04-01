import { InputType, Field } from '@nestjs/graphql';
import { TodoStatus } from '../entities/todo.entity';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field(() => TodoStatus, { nullable: true })
  status?: TodoStatus;
}
