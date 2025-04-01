import { InputType, Field, Int } from '@nestjs/graphql';
import { TodoStatus } from '../entities/todo.entity';

@InputType()
export class FindTodoInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  title?: string;

  @Field(() => TodoStatus, { nullable: true })
  status?: TodoStatus;

  @Field(() => Date, { nullable: true })
  createdAfter?: Date;

  @Field(() => Date, { nullable: true })
  createdBefore?: Date;
}
