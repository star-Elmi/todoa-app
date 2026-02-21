export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  completed?: boolean;
};

export type UpdateTodoInput = {
  title?: string;
  completed?: boolean;
};
