import request from 'supertest';
import { createApp } from './app';

jest.mock('./config/database', () => ({
  checkDatabaseConnection: jest.fn().mockResolvedValue(true),
}));

jest.mock('./repositories/taskRepository', () => ({
  findAllTasks: jest.fn(),
  findTaskById: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

import * as taskRepository from './repositories/taskRepository';

const app = createApp();

describe('TaskFlow API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET / responde con información de la API', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.service ?? response.body.message).toBeDefined();
  });

  it('GET /health responde ok cuando la base de datos está conectada', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('GET /api/tasks retorna la lista de tareas', async () => {
    (taskRepository.findAllTasks as jest.Mock).mockResolvedValue([
      {
        id: 1,
        title: 'Estudiar Docker',
        description: 'Entrega 1',
        completed: false,
        created_at: new Date().toISOString(),
      },
    ]);

    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Estudiar Docker');
  });

  it('POST /api/tasks valida el título obligatorio', async () => {
    const response = await request(app).post('/api/tasks').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El título es obligatorio');
  });

  it('POST /api/tasks crea una tarea', async () => {
    (taskRepository.createTask as jest.Mock).mockResolvedValue({
      id: 2,
      title: 'Configurar GitHub',
      description: null,
      completed: false,
      created_at: new Date().toISOString(),
    });

    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Configurar GitHub' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Configurar GitHub');
  });
});
