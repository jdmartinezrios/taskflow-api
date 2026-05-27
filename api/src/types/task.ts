export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}
