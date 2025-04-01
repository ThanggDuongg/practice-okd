import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum TodoStatus {
  NOT_DONE_YET = 'NOT_DONE_YET',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

registerEnumType(TodoStatus, { name: 'TodoStatus' });

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => TodoStatus)
  status: TodoStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
