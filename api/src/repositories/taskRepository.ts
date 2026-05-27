import { query } from '../config/database';
import { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';

export async function findAllTasks(): Promise<Task[]> {
  return query<Task>(
    `SELECT id, title, description, completed, created_at
     FROM tasks
     ORDER BY created_at DESC`
  );
}

export async function findTaskById(id: number): Promise<Task | null> {
  const rows = await query<Task>(
    `SELECT id, title, description, completed, created_at
     FROM tasks
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const rows = await query<Task>(
    `INSERT INTO tasks (title, description)
     VALUES ($1, $2)
     RETURNING id, title, description, completed, created_at`,
    [input.title, input.description ?? null]
  );
  return rows[0];
}

export async function updateTask(id: number, input: UpdateTaskInput): Promise<Task | null> {
  const rows = await query<Task>(
    `UPDATE tasks
     SET
       title = COALESCE($2, title),
       description = COALESCE($3, description),
       completed = COALESCE($4, completed)
     WHERE id = $1
     RETURNING id, title, description, completed, created_at`,
    [id, input.title ?? null, input.description ?? null, input.completed ?? null]
  );
  return rows[0] ?? null;
}

export async function deleteTask(id: number): Promise<boolean> {
  const rows = await query<{ id: number }>(
    'DELETE FROM tasks WHERE id = $1 RETURNING id',
    [id]
  );
  return rows.length > 0;
}
