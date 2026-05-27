import { Router, Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  findAllTasks,
  findTaskById,
  updateTask,
} from '../repositories/taskRepository';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const tasks = await findAllTasks();
  res.json(tasks);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  const task = await findTaskById(id);
  if (!task) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }

  res.json(task);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, description } = req.body as { title?: string; description?: string };

  if (!title || title.trim().length === 0) {
    res.status(400).json({ message: 'El título es obligatorio' });
    return;
  }

  const task = await createTask({ title: title.trim(), description });
  res.status(201).json(task);
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  const { title, description, completed } = req.body as {
    title?: string;
    description?: string;
    completed?: boolean;
  };

  const task = await updateTask(id, { title, description, completed });
  if (!task) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }

  res.json(task);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  const deleted = await deleteTask(id);
  if (!deleted) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }

  res.status(204).send();
});

export default router;
