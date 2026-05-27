CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (title, description, completed)
VALUES
  ('Configurar repositorio en GitHub', 'Crear el repo y subir el código inicial', FALSE),
  ('Levantar contenedores Docker', 'API y PostgreSQL comunicados con docker-compose', FALSE);
